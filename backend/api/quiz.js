const express = require('express');
const mongoose = require('mongoose');
const random = require('mongoose-random');
const Employee = mongoose.model('Employee');
const adminQuestion = mongoose.model('adminQuestion')
const quiz = express.Router();

const getRandom = (to) => Math.floor(Math.random() * to);
const shuffle = (a) => {
    for (let i = a.length; i; i--) {
        let j =  getRandom(i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
};
const getQuiz = (user, index, result, rightAnswers, allQuestions) => {
    
    const randIndex =  getRandom(allQuestions.length);
    if(allQuestions.length) {
        let newQuizes;
        if (allQuestions[randIndex].type === 'tag') {
            let answer = 0
            const names =  allQuestions[randIndex].answers;
            const newAnswers = [...allQuestions[randIndex].answers];
            shuffle(newAnswers);
            for (let i = 0; i < names.length; i++) {
                answer = 10 * answer + (newAnswers.indexOf(names[i]) + 1)
            }
            const { type, who, answers } = allQuestions[randIndex];
            newQuizes = {type, who, answers}
            newQuizes.answers = newAnswers
            
            rightAnswers.push(answer);
            allQuestions.splice(randIndex, 1);
        } else {
            rightAnswers.push(allQuestions[randIndex].rightAnswer);
            newQuizes = allQuestions[randIndex];
            allQuestions.splice(randIndex, 1);
        }
        return newQuizes;
    } else {
        return  getRandom(2) === 1 ?
            nameQuizGenerator(user, index, result, rightAnswers) :
            picQuizGenerator(user, index, result, rightAnswers);
    }
    
}
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
    return {type: 'picture', who:{picture: ask}, answers: answers }
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
    return {type: 'name', who:{text: ask}, answers: answers }
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

quiz.get('/', async (req, res) => {
    const rightAnswers = [];
    const { _id } = req.user; 
    try {
        const allQuestions = await adminQuestion.find({}).exec();
        const result = await Employee.find({_id: {$ne: _id}});

        const shuffled = [...result];
        shuffle(shuffled); 
            
        const newResult = result.map((user, index) => {
            const random = getRandom(3);
            if (random === 1) {
                return nameQuizGenerator(user, index, result, rightAnswers);
            } else if (random === 2) {
                return picQuizGenerator(user, index, result, rightAnswers);
            } else {
                return getQuiz(user, index, result, rightAnswers, allQuestions);
            }
        });
        
        res.json(newResult);
        await Employee.update({_id}, {$set: { rightAnswers }}, {upsert: true});
    } catch(e) {
        console.log(e);
    }
   
});

quiz.post('/', (req, res) => {
    const { _id } = req.user; 
    const { answers } = req.body;
    Employee.findById(_id)
        .then(result => {
            const quizRezult = compare(result.rightAnswers, answers);
            Employee.update({_id}, {$set: {quizRezults: [quizRezult]} }, {upsert: true});
            res.send(result.rightAnswers); 
        });
});
module.exports = quiz;