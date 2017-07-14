const express = require('express')
const autocomplete = express.Router()
const mongoose = require('mongoose')

autocomplete.get('/employeeNames', (req, res) => {
    const Employee = mongoose.model('Employee')
    Employee.find({}, {
        name: 1,
        firstName: 1,
        lastName: 1
    }).then(result => {
        const employees = result.map(employee => {
            return employee.name
        })
        res.status(200).json(employees)
    }).catch(err => {
        res.status(500).json({error: "Database issue"});
    })

})

module.exports = autocomplete
