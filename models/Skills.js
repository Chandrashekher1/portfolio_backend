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
    },
    imageUrl: {
        type : String,
        required: true
    }
})

function validateSkill(skill){
    const Schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        proficiency: Joi.string().valid('beginner', 'intermediate', 'advanced').optional(),
        imageUrl: Joi.string().uri().required()

    })
    return Schema.validate(skill)
}

const skillModel = mongoose.model("Skill",SkillSchema)

module.exports.skills = skillModel
module.exports.validateSkill = validateSkill