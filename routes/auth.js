const bcrypt = require('bcrypt')
const {Admin} = require('../models/Admin')
const express = require('express')
const router = express.Router()
const Joi = require('joi')

router.post('/', async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(400).json({message: error.details[0].message})
    
    let user = await Admin.findOne({email: req.body.email})
    if(!user) return res.status(400).json({ message: "User is not registered" });
    
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword) return res.status(400).json({ message: "Invalid Password" });
    
    const token = user.generateAuthToken()
    res.header('Authorization',token).send(user)
})

function validate(user){
    const Schema = Joi.object({
        email: Joi.string().min(0).max(2000).required(),
        password: Joi.string().required(),
    })
   return Schema.validate(user);
}

module.exports = router