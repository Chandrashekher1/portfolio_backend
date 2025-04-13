const auth = require('../middleware/auth') 
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Admin,validateAdmin} = require('../models/Admin')
const express = require('express')
const router = express.Router()

router.get('/me',[auth], async (req,res) => {
    const user = await Admin.findById(req.user._id).select('-password')
    res.send(user)
})

router.post('/', async (req,res) => {
    const {error} = validateAdmin(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    let user = await Admin.findOne({email:req.body.email})
    if(user) {
        return res.status(400).json({ message: "User is already exists" });
    }

    let admin = new Admin({
        email: req.body.email,
        password: req.body.password
    })
    const salt = await bcrypt.genSalt(10)
    admin.password = await bcrypt.hash(req.body.password,salt)
    admin = await admin.save()
    const token = admin.generateAuthToken()    
    res.header('Authorization',token).json({ message: "User registered Successfully", token , admin })
})

module.exports = router