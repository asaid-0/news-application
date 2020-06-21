class ErrorHandler extends Error {
    constructor(code, message) {
        super();
        this.code = code || 400;
        this.message = message;
    }
}

const handleError = (err, res) => {
    const { code = 400, message } = err;
    if (code === 'EBADCSRFTOKEN') {
        return res.status(403).json({
            status: "error",
            code: 403,
            message: "Invalid CSRF Token"
        });
    }
    res.status(code).json({
        status: "error",
        code,
        message
    });
};


module.exports = {
    ErrorHandler,
    handleError
}
