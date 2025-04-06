const Joi = require('joi')
const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength:50
    },
    proficiency: {
        type : String,
        enum :["beginner","intermediate","advanced"]
    }
})

function validateSkill(skill){
    const Schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        proficiency: Joi.string().valid('beginner', 'intermediate', 'advanced').optional()
    })
    return Schema.validate(skill)
}

module.exports.skills = SkillSchema
module.exports.validateSkill = validateSkill