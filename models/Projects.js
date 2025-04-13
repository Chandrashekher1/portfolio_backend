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
    image: {
        type: String 
    },
    livelink:{
        type:String,
        default:''
    },
    repolink: {
        type: String,
        default:''
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const projectModel = mongoose.model("Projects",projectSchema)

function validateProject(project) {
    const Schema = Joi.object({
        title: Joi.string().min(1).max(100).required(),
        description: Joi.string().min(1).max(1000).required(),
        technologies: Joi.array().items(Joi.string()).optional(),
        livelink: Joi.string().uri().optional(),
        repolink: Joi.string().uri().optional(),
        image: Joi.string().required(),
    }).unknown(true)
    
    return Schema.validate(project)
}


module.exports.Projects = projectModel
module.exports.validate = validateProject