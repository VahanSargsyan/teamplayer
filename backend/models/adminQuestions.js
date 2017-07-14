const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = function(){
    const whoSchema = new Schema({
        picture: String, 
        text: String 
    })

    const adminQuestion = new Schema({
        type: String,
        who: whoSchema,
        answers: Array,
        rightAnswer: Number
    });

    mongoose.model('adminQuestion', adminQuestion)
};

