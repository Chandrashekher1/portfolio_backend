const Joi = require('joi')
const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
        minlength:3,
        maxlength:100,
        trim: true
    },
    description: {
        type:String,
        required:true,
        minlength:3,
        maxlength:1000,
    },
    technologies: {
        type:[String],
        default:[]
    },
    livelink:{
        type:String,
        default:''
    },
    repolink: {
        type: String,
        default:''
    },
    image : {
        type:mongoose.Schema.ObjectId,
        ref:'Images'
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    }
})

function validateProject(project) {
    const Schema = Joi.object({
        title: Joi.string().min(1).max(100).required(),
        description: Joi.string().min(1).max(1000).required(),
        technologies: Joi.array().items(Joi.string()).optional(),
        livelink: Joi.string().uri().optional(),
        repolink: Joi.string().uri().optional(),
        Image:Joi.string().optional()
    })

    return Schema.validate(project)
}

module.exports.Projects = projectSchema
module.exports.validate = validateProject