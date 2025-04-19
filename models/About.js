const Joi = require('joi')
const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    profession: {
        type: [String],
        required:true,
    },
    bio :{
        type: String,
        required: true
    },
    image: {
        type: String
    },
    socialLinks: {
        github: {type: String, required:true},
        linkedin: {type: String, required:true},
        twitter: {type: String, required:true},
        portfolio: {type: String, required:true},
        resume: {type: String, required:true}

    }
}, {timestamps:true})

const aboutModel = mongoose.model("About",AboutSchema)

function AboutValidation(about){
    const Schema = Joi.object({
        name: Joi.string().required(),
        profession: Joi.array().items(Joi.string()).required(),
        bio: Joi.string().required(),
        email: Joi.string().required(),
        socialLinks: Joi.object({
            github: Joi.string().uri().required(),
            linkedin: Joi.string().uri().required(),
            twitter: Joi.string().uri().required(),
            portfolio: Joi.string().uri().required(),
            resume: Joi.string().uri().required()
        }).required()
    })
    return Schema.validate(about)
}

module.exports.About = aboutModel
module.exports.validate = AboutValidation