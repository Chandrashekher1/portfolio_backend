const jwt = require('jsonwebtoken')
const Joi = require('joi')
const mongoose  = require('mongoose')

const AdminSchema = new mongoose.Schema({
    email: {
        type : String,
        unique: true,
        required: true,
        minlength: 5,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength:1024
    },
    isAdmin: {
        type :Boolean,
        default: false
    },
    // imageUrl: {
    //     type: String,
    //     default:''
    // }

})
AdminSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.portfolio_jwtPrivateKey)
    return token
}

const AdminModel = mongoose.model("Admin",AdminSchema)

function validateAdmin(admin){
    const Schema  = Joi.object({
        email: Joi.string().min(5).max(255).required(),
        password:Joi.string().min(5).max(255).required(),
        // imageUrl:Joi.string().uri().optional()
    })
    return Schema.validate(admin)
}

module.exports.Admin = AdminModel
module.exports.validateAdmin = validateAdmin