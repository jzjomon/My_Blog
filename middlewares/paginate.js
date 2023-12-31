const mongoose = require('mongoose')
const UPLOADS = require('../models/blogModel')
const convertISO = require('../helpers/dateConverter')

const paginate = (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = 4;
    const start = (page - 1) * limit;
    UPLOADS.find().limit(limit).skip(start).then(response => {
        for(x of response){
            x.date = convertISO(x.uploadedAt)
        }
        let nextPage = page + 1;
        let previous = page - 1;
        if (page < response.length) {
            res.locals.next = nextPage;
            res.locals.posts = response;
            next()
        } else if (page > response.length) {
            res.locals.previous = previous;
            res.locals.posts = response;
            next();
        } else {
            res.locals.next = nextPage;
            res.locals.previous = previous;
            res.locals.posts = response;
            next();
        }
    })
}

module.exports = paginate;