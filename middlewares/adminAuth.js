const jwt = require('jsonwebtoken')
const getAdminData = require('../helpers/adminHelper')
const parseJwt = require('../helpers/jwtParser')

const adminAuth = (req, res, next) => {
    try {
        if (req.cookies.adminToken) {
            const logingVerify = jwt.verify(req.cookies.adminToken, process.env.JWT_PASS);
            if (logingVerify) {
                const adminid = parseJwt(req.cookies.adminToken)
                getAdminData(adminid.id).then(response => {
                    res.locals.adminDetails = response[0]
                    next()
                })
            } else {
                req.cookies.adminToken = null;
                res.redirect('admin/')
            }
        } else {
            res.redirect('/admin')
        }
    } catch (err) {
        res.render('admin/404')
    }

}


module.exports = adminAuth;