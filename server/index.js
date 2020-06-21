// it's not recommended to use .env file in production
if (process.env.NODE_ENV !== 'production') {
    // TODO: check if .env file exists otherwise copy .env.example
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const mongoSanitizer = require('express-mongo-sanitize');
const xssSanitizer = require('xss-clean');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
require('express-async-errors');

const routes = require('./routes/v1');
const { handleError, ErrorHandler } = require('./helpers/error');

const csrfProtection = csrf({
    cookie: true
});


require('./config/database');

const app = express();



// enable cors
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// sanitize requests from mongo malicious queries
app.use(mongoSanitizer());

// sanitize requests from xss payloads
app.use(xssSanitizer());

app.use(express.json())
app.use(cookieParser());


// v1 routes
app.use('/v1', routes);



// use csrf middle ware
// app.use(csrfProtection);

// csrf token issuer
app.get('/v1/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// Error handler middleware
app.use((err, req, res, next) => {
    handleError(err, res);
});

const port = +(process.env.NODE_SERVER_PORT || 5000)
app.listen(port, () => console.log(`Server is listening on port ${port}`));