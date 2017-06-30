const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function() {
    const Employee = new Schema({
        googleId: String,
        email: String,
        token: String,
        firstName: String,
        lastName: String,
        picture: String,
        position: String,
        jobDescription: String,
        hobbies: Array,
        fbLink: String,
        trainingStep: Number
    });
    mongoose.model("Employee", Employee);
};
