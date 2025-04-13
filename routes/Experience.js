const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const express = require('express')
const router = express.Router()
const {experience, validateExperience} = require('../models/Experience')

router.get('/', async (req,res) => {
    const result = await experience.find().sort({createdAt : -1})
    res.send(result)
})

router.post('/', [auth,admin], async (req,res) => {
    const {error} = validateExperience(req.body)
    if(error) return res.status(400).json({message: error.details[0].message})

    try{
        let post = new experience({
            company: req.body.company,
            role: req.body.role,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            description: req.body.description
        })
        post = await post.save()
        res.send(post)
    }
    catch(error) {
        res.status(500).json({message: error.details[0].message})
    }
})

router.put('/:id', [auth,admin], async (req,res) => {
    const {error} = validateExperience(req.body)
    if(error) return res.status(400).json({message: error.details[0].message})

    try{
        const update = await experience.findByIdAndUpdate(req.params.id,req.body, {new: true})
        if(!update) return res.status(400).json({message:"given data not found."})
        res.send(update)
    }
    catch(error) {
        res.status(500).json({message: "Something wrong while updating experience."})
    }
})
router.delete('/:id', [auth,admin], async(req,res) => {
    try{
        const post = await findByIdAndDelete(req.params.id)
        if(!post) return res.status(404).json({message: "Not found."})
        res.json({message: "Experience deleted successfully."})
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong while deleting."})
    }
})

module.exports = router