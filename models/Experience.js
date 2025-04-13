const Joi = require('joi')
const mongoose = require('mongoose')

const experienceSchema = mongoose.Schema({
    company : {
        type:String,
        required: true,
        minlength: 3,
        maxlength: 1000,
        trim: true
    },
    role: {
        type:String,
        required: true,
        trim : true,
        minlength: 2,
        maxlength: 100
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description : {
        type: String,
        minlength: 2,
        maxlength: 1000,
        required: true,
    }
})

function validateExperience(experience){
    const Schema = Joi.object({
        company: Joi.string().min(3).max(1000).required(),
        role: Joi.string().min(2).max(100).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().optional(),
        description: Joi.string().min(10).required()
    })
    return Schema.validate(experience)
}

const experienceModel = mongoose.model("Experience",experienceSchema)

module.exports.experience = experienceModel
module.exports.validateExperience = validateExperience