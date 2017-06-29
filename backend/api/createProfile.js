const express = require('express');

const createProfile = express.Router();

createProfile.get('/', (req, res) => {
    res.send("Create Profile API");
});

module.exports = createProfile;