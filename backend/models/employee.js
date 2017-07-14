const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function() {
    const hobbiesSchema = new Schema({
        label : String
    })
    const Employee = new Schema({
        googleId: String,
        email: String,
        firstName: String,
        lastName: String,
        gender: String,
        bio: String,
        picture: String,
        position: String,
        jobDescription: String,
        education: String,
        hobbies: [hobbiesSchema],
        fbLink: String,
        trainingStep: String,
        gender: String,
        bio: String,
        education: String,
        rightAnswers: Array,
        quizRezults: Number
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });
    Employee
        .virtual('name')
        .get(function(){
            return `${this.firstName} ${this.lastName}`
        })
    mongoose.model("Employee", Employee);
};
