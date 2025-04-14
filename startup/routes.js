const about = require('../routes/About')
const admin = require('../routes/Admin')
const login = require('../routes/auth')
const project = require('../routes/Projects')
const skill = require('../routes/Skills')
const experience = require('../routes/Experience')
const express = require('express')

module.exports = function (app){
    app.use(express.json())
    app.use('/api/project',project)
    app.use('/api/skill',skill)
    app.use('/api/experience',experience)
    app.use('/api/about',about)
    app.use('/api/login',login)
    app.use('/api/admin',admin)
}