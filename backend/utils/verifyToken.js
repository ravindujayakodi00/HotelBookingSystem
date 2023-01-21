const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.status(401).json({error: 'You are not authorized'});
    }

    jwt.verify(token, process.env.JWT, (err, user)=> {
        if(err) {
            return res.status(403).json({error: 'Token is not valid'});
        }

        req.user = user;
        next();
    })

};

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next , () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            if (error) {
                return next(error(403, 'You are not authorized to perform this action'))
            }
        }
    });
}

const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next , () => {
        if(req.user.isAdmin) {
            next();
        } else {
            if (error) {
                return next(error(403, 'You are not authorized to perform this action'))
            }
        }
    });
}

module.exports = {verifyToken, verifyUser, verifyAdmin};