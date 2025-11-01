const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403).json({
            message:"Unauthorized, Jwt Token is required"
        })
    }

    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        // req.user stores the verified user info that is payload of the token
        // email and _id
        req.user = decoded;
        next();

    }catch(error){
        return res.status(401).json({
            message:"Unauthorized, Jwt token wrong or expired"
        })
    }
}

module.exports = ensureAuthenticated;