const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const {skills,validateSkill} = require('../models/Skills')
const express = require('express')
const router = express.Router()


router.get('/',async(req,res) => {
    const skill = await skills.find().sort({createdAt: -1})
    res.send(skill)
})

router.post('/', [auth,admin], async(req,res) => {
    const {error} = validateSkill(req.body)
    if(error) return res.status(400).json(error.details[0].message)
    
    try{
        let skill = new skills({
            name: req.body.name,
            proficiency: req.body.proficiency
        })
        skill = await skill.save()
        res.send(skill)
    }
    catch(error) {
        res.status(500).json({message: "Something went wrong while creating skill."})
    }
})

router.put('/:id', [auth,admin], async(req,res) => {
    const {error} = validateSkill(req.body)
    if(error) return res.status(404).json({message: error.details[0].message})
    
    try{
        let skill = await skills.findByIdAndUpdate(req.params.id, req.body, {new : true})
        if(!skill) return res.status(404).json({message: "skill mnot found."})
        
        res.send(skill)
    }
    catch(error) {
        res.status(500).json({message: "something went wrong while updating skill."})
    }
})

router.delete('/:id', [auth,admin], async(req,res) => {
    try{
        const skill = await skills.findByIdAndDelete(req.params.id)
        if(!skill) return res.status(404).json({message:"skill not found"})
        
        res.json({message:"skill deleted successfully."})
    }
    catch(error){
        res.status(500).json({message: "Something went wrong while deleting skill."})
    }
    
})

module.exports = router