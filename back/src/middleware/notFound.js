const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        res.status(401).json({msg: "No token, authorization denied"});
        return (null);
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        return (next(decoded.user_id));
    } catch (e) {
        console.error(e);
        res.status(401).json({msg: "Token is not valid"});
        return (null);
    }
};

module.exports = verifyToken;