const { verifyToken } = require('../services/user.service');
const { ErrorHandler } = require('../helpers/error');

const auth = async (req, res, next) => {
    const token = req.cookies.jwtToken;
    if (token) {
        const userPayload = await verifyToken(token.split(" ")[1]);
        if (userPayload) {
            req.currentUser = userPayload;
            next();
            return;
        }
    }
    throw new ErrorHandler(401, "Authentication failed");   
}

module.exports = auth;