////////////////////////////////////////////////////////////////////////////
/////////////////////////// dummy data
const custom = {
    type: 'custom',
    who: {
        picture: 'http://cdn3-www.comingsoon.net/assets/uploads/2016/07/CommandoBar.jpg',
        text: 'whot is the best side of this person'
    },
    answers: ['cooking', 'shmeling', 'shntiling', 'terminateing'],
    rightAnswer:  3
};
const tag = {
    type: 'tag',
    who: {
        picture: 'http://idolwow.com/wp-content/uploads/2015/07/btob-hang-with-arnie-at-terminator-premiere-pics-20150703.jpg'
        
    },
    answers: ['psqo', 'msqo', 'tajat', 'krjat']
}
const questions = [custom, tag];
/////////////////////////////////dummy data end 
///////////////////////////////////////////////////////////////////////////////////////

const express = require('express');
const mongoose = require('mongoose');
const random = require('mongoose-random');
const Employee = mongoose.model('Employee');
const quiz = express.Router();
const getRandom = (to) => Math.floor(Math.random() * to);
const allQuestions = questions;

const shuffle = (a) => {
    for (let i = a.length; i; i--) {
        let j =  getRandom(i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
};
const getQuiz = (user, index, result, rightAnswers) => {
    
    const randIndex =  getRandom(allQuestions.length);
    if(allQuestions.length) {
        let newQuizes;
        if (allQuestions[randIndex].type === 'tag') {
            rightAnswers.push(1234);
            newQuizes = allQuestions[randIndex];
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
        j = getRandom(users.length )
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
        j = getRandom(users.length )
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
    return 100 * (result / arr1.length);  
}

quiz.get('/', (req, res) => {
    const rightAnswers = [];
    const _id = "5966093afe434c19842171e9"// req.user; 
    const filter = {_id: {$ne: _id}};

    Employee.find({_id: {$ne: _id}})
        .then(result => {
            const shuffled = [...result]
            shuffle(shuffled)
            return shuffled
        })
        .then(result => {
            const newResult = result.map((user, index) => {
                const random = getRandom(3);
                
                debugger;
                if (random === 1) {
                    return nameQuizGenerator(user, index, result, rightAnswers);
                } else if (random === 2) {
                    return picQuizGenerator(user, index, result, rightAnswers);
                } else {
                    return getQuiz(user, index, result, rightAnswers);
                }
            });

            res.send(newResult);
        })
        .then(() => Employee.update({_id}, {$set: { rightAnswers }}, {upsert: true}))
        .catch(err => console.log(err))
        
});

quiz.post('/', (req, res) => {
    const { _id } = req.user; 
    const { answers } = req.body;
    Employee.findById(_id)
        .then(result => {
            const quizResult = compare(result.rightAnswers, answers);
            Employee.update({_id}, {$set: {quizResults} }, {upsert: true});
            res.send(result.rightAnswers); 
        });
});
module.exports = quiz;