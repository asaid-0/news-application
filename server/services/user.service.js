const User = require('../models/user.model');
const { ErrorHandler } = require('../helpers/error');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY || "AnySecretKey10145@@@$"

/**
 * Create new user
 * @param {Object}  new user object: {email, password, name}
 * @returns {Promise<User>}   Promise that resolves to a User object
 */
const createUser = async (newUser) => {
    const emailExists = await User.isEmailExists(newUser.email);
    if (emailExists) {
        throw new ErrorHandler(409, { email: { properties: { message: 'Email does exist!' } } });
    }
    try {
        const user = await User.create(newUser);
        return user;
    } catch (error) {
        throw new ErrorHandler(400, error.errors);
    }
};

/**
 * Find user by email
 * @param {ObjectId} User's Email
 * @returns {Promise<User>} Promise that resolves to a User object
 */
const findUserByEmail = async (email) => {
    // findById returns Query object not promise ...  
    return User.findOne({ email });
};

/**
 * Login by email and password
 * @param {string} email    User's Email
 * @param {string} password User's Passwod
 * @returns {Promise<User>} Promise that resolves to a User object
 */
const loginByEmailAndPassword = async (email, password) => {
    const user = await findUserByEmail(email);
    if (!user || !(await user.checkPassword(password))) {
        throw new ErrorHandler(401, 'Incorrect email or password');
    }
    return user;
};

/**
 * Generate token
 * @param {Object}  user object
 * @returns {string}    JWT user access token
 */
const generateToken = (user) => {
    const payload = {
        exp: Math.floor(Date.now() / 1000) + +(process.env.NODE_JWT_EXPIRES_MS || 3600),
        userId: user._id,
        userName: user.name,
        userSources: user.sources
    };
    return jwt.sign(payload, secret);
};


/**
 * Check if token is valid
 * @param {string} token
 * @returns {bool}  true if token is valid
 */
const verifyToken = async (token) => {
    try {
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        throw new ErrorHandler(401, 'Invalid Token');
    }
};

module.exports = {
    createUser,
    loginByEmailAndPassword,
    generateToken,
    verifyToken
}