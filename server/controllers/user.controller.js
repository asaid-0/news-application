const { loginByEmailAndPassword, createUser, generateToken } = require('../services/user.service');
// const { ErrorHandler } = require('../helpers/error');

const register = async (req, res) => {
    try {
        const user = await createUser(req.body);
        const token = generateToken(user);
        res.cookie('jwtToken', `Bearer ${token}`, { httpOnly: true, sameSite: "Strict", path: "/" }).status(201).send({ userId: user._id, sources: user.sources, email: user.email });
    } catch (error) {
        throw  error;
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginByEmailAndPassword(email, password);
        const token = generateToken(user);
        res.cookie('jwtToken', `Bearer ${token}`, { httpOnly: true, sameSite: "Strict", path: "/" }).status(200).send({ userId: user._id, sources: user.sources, email: user.email });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    register,
    login
}