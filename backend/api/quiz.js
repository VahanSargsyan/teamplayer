const express = require('express');

const login = express.Router();

login.get('/', (req, res) => {
    res.send("Quiz API");
});

module.exports = login;