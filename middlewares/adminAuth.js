const jwt = require('jsonwebtoken')
const getAdminData = require('../helpers/adminHelper')

const adminAuth = (req, res, next) => {
    if(req.cookies.adminToken){
        const logingVerify = jwt.verify(req.cookies.adminToken,'tokenpass');
        if(logingVerify){
            const adminid = parseJwt(req.cookies.adminToken)
            getAdminData(adminid.id).then(response => {
                res.locals.adminDetails = response[0]
                next()
            })
        }else{
            req.cookies.adminToken = null;
            res.redirect('admin/')
        }
    }else{
        res.redirect('/admin')
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

module.exports = adminAuth;