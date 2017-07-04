const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function() {
    const hobbiesSchema = new Schema({
        label : String
    })
    const Employee = new Schema({
        googleId: String,
        email: String,
        token: String,
        firstName: String,
        lastName: String,
        picture: String,
        position: String,
        jobDescription: String,
        hobbies: [hobbiesSchema],
        fbLink: String,
        trainingStep: mongoose.Schema.Types.ObjectId
    });
    mongoose.model("Employee", Employee);
};
