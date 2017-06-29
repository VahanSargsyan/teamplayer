const express = require('express');

const explore = express.Router();

explore.get('/', (req, res) => {
    res.send("Explore API");
});

module.exports = explore;