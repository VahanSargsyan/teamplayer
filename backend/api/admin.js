const express = require('express')
const adminApi = express.Router();
const mongoose = require('mongoose')


const adminQuestion = mongoose.model('adminQuestion');

adminApi.post('/question', (req, res) => {
    
    const {type, picture, text, answers, rightAnswer} = req.body
    var reqObject = {
        type ,
        who: {
            picture,
            text
        },
        answers,
        rightAnswer
    }
    var newReq = new adminQuestion(reqObject)
    return newReq.save()
     
})

module.exports = adminApi;
