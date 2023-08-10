const jwt = require('jsonwebtoken');
const { getUserData } = require('../helpers/userHelper');
const parseJwt = require('../helpers/jwtParser')

const userAuth = (req, res, next) => {
    try {
        if (req?.cookies?.userToken) {
            const isLoggedin = jwt.verify(req.cookies.userToken, process.env.JWT_PASS);
            if (isLoggedin) {
                const userData = parseJwt(req.cookies.userToken);
                getUserData(userData.userid).then(response => {
                    res.locals.userDetails = response[0];
                    next()
                })
            } else {
                res.cookie('userToken', null, {
                    httpOnly: true,
                    samSite: 'lax',
                    secure: false,
                    maxAge: 1
                })
                req.cookies.userToken = null;
                res.redirect('/')
            }
        } else {
            res.redirect('/')
        }
    } catch (err) {
        res.render('admin/404')
    }
}


module.exports = { userAuth }
