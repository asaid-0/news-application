const { loginByEmailAndPassword, createUser, generateToken } = require('../services/user.service');
const { ErrorHandler } = require('../helpers/error');

const register = async (req, res) => {
    try {
        const user = await createUser(req.body);
        const token = generateToken(user);
        res.status(201).send({ userId: user._id, sources: user.sources, email: user.email, token });
    } catch (error) {
        throw new ErrorHandler(409, error);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginByEmailAndPassword(email, password);
        const token = generateToken(user);
        res.status(200).send({ userId: user._id, sources: user.sources, email: user.email, token });
    } catch (error) {
        throw new ErrorHandler(401, error);
    }
};

module.exports = {
    register,
    login
}