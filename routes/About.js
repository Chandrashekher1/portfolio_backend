const {About,validate} =  require('../models/About')
const express = require('express')
const router = express.Router()
const uploadMultiple = require('../config/storage')

router.get('/', async(req,res) => {
    const about = await About.find()
    if(!about) return res.status(400).json({message: "Something wrong."})
    res.send(about)
})

router.post('/', uploadMultiple, async(req,res) => {
    const {error} = validate(req.body)
    if(error) return res.status(404).send({message: error.details[0].message})

    try{
        let about = new About({
            name: req.body.name,
            profession: req.body.profession,
            bio: req.body.bio,
            email: req.body.email,
            socialLinks: {
                github: req.body.socialLinks.github,
                linkedin: req.body.socialLinks.linkedin,
                twitter: req.body.socialLinks.twitter,
                portfolio: req.body.socialLinks.portfolio,
                resume: req.body.socialLinks.resume
            },
            image: req.file?.path
        })
        console.log(about);
        
        about = await about.save()
        res.send(about)
    }
    catch(error){
        res.status(500).json({message: error.details[0].message})
    }
})

router.put('/:id',uploadMultiple, async(req,res) => {
    try{
        let updated = await About.findByIdAndUpdate(req.params.id,req.file?.path, {new: true})
        if(!updated) return res.status(400).json({message:"given data not found."})
        res.send(updated)
    }
    catch(error){
        res.status(500).json({message: "Something went wrong while updating."})
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const about = await About.findByIdAndDelete(req.params.id)
        if(!about) return res.status(404).json({message: "Not found."})
        res.send(about)
    }
    catch(error){
        res.status(500).json({message: error.details[0].message})
    }
})

module.exports = router