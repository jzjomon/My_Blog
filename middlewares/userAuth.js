const jwt = require('jsonwebtoken');
const { getUserData } = require('../helpers/userHelper');

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

function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

module.exports = { userAuth }
