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

module.exports = verifyToken;