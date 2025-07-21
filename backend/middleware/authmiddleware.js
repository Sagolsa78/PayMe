const JWT_SECRET = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = function (req, res, next) {
    const authHeader = req.headers.authorization;
   

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({
            msg: "there was an error in authorization"
        })
    }

    const token = authHeader.split(' ')[1];


    try {
        const decoded = jwt.verify(token, JWT_SECRET);


        req.user = { _id: decoded.userId };
        next();
    }
    catch (err) {
        return res.status(404).json({
            msg: "there is an error while validating"
        })
    }
}

module.exports = {
    authMiddleware
};