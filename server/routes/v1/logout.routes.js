const express = require('express');

const router = express.Router();

// Log out
router.get('/', function (req, res) {
    cookie = req.cookies;
    for (let prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', { expires: new Date(0) });
    }
    res.status(200).send({ status: "success" });
});

module.exports = router;