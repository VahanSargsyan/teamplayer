const express = require('express');
const mongoose = require('mongoose');
const random = require('mongoose-random');
const Employee = mongoose.model('Employee');

const quiz = express.Router();

const getRandom = (to) => Math.floor(Math.random() * to);

const shuffle = (a) => {
    for (let i = a.length; i; i--) {
        let j =  getRandom(i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
};
const nameQuizGenerator = (user, index, users, rightAnswers) => {
    const ask = user.picture;
    const answers = [user.firstName]
    const allrediInAsk = [index]
    let i = 0;
    let j;
    while (i < 3) {
        j = getRandom(users.length - 1)
        if (!allrediInAsk.includes(j)) {
            allrediInAsk.push(j);
            answers.push(users[j].firstName);
            i++;
        }
    }
    shuffle(answers)
    rightAnswers.push(answers.indexOf(user.firstName))
    return {type: 'picture', who: ask, answers: answers }
} 
 const picQuizGenerator = (user, index, users, rightAnswers) => {
    const ask = user.firstName;
    const answers = [user.picture]
    const allrediInAsk = [index]
    let i = 0;
    let j;
    while (i < 3) {
        j = getRandom(users.length - 1)
        if (!allrediInAsk.includes(j)) {
            allrediInAsk.push(j);
            answers.push(users[j].picture);
            i++;
        }
    }
    shuffle(answers)
    rightAnswers.push(answers.indexOf(user.picture))
    return {type: 'name', who: ask, answers: answers }
}

const compare = (arr1, arr2) => {
    const length = arr1.length >= arr2.length ? arr1.length : arr2.length;
    let result = 0;

    for (let i = 0; i < length; i++) {
        if (arr1[i] === arr2[i]) {
            result++
        }
    }
    return result;  
}
quiz.get('/', (req, res) => {
    const rightAnswers = [];
    const {_id} = req.user; 
    const filter = {_id: {$ne: _id}};
    Employee.find({_id: {$ne: _id}})
        .then(result => {
            const shuffled = [...result]
            shuffle(shuffled)
            return shuffled
        })
        .then(result => res.send(result.map((user, index) => getRandom(2) === 1 ?
            nameQuizGenerator(user, index, result, rightAnswers) :
            picQuizGenerator(user, index, result, rightAnswers))))
        .then(() => Employee.update({_id}, {$set: { rightAnswers }}, {upsert: true}))
        .catch(err => console.log(err))
        
});

quiz.post('/', (req, res) => {
    console.log(`aaaaaaaaaaaaaaaa!`)
    const { _id } = req.user; 
    const { answers } = req.body;
    Employee.findById(_id)
        .then(result => {
            const quizRezult = compare(result.rightAnswers, answers);
            console.log(`quiz result is ---> ${typeof quizRezult}`)
            Employee.update({_id}, {$set: {quizRezults: [quizRezult]} }, {upsert: true});
            res.send(result.rightAnswers); 
        });
});
module.exports = quiz;