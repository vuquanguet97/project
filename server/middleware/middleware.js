const jwt = require('jsonwebtoken');
const secret = 'omi-nodejs';

//middleware
const withAuth = function(req, res, next){
    const token =
        // req.body.token               ||
        // req.query.token              ||
        // req.headers['x-access-token']||
        req.cookies.token;
    if (!token){
        res.status(401).send('Ban khong co quyen truy cap');
    } else {
        jwt.verify(token, secret, function (err, decoded) {
            if(err){
                res.status(401).send('Quyen truy cap khong hop le');
            } else {
                req.email = decoded.email;
                next();
            }
        })
    }
};

module.exports = {
    withAuth: withAuth
};