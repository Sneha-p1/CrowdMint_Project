const { Schema} =require('mongoose');
const { mongoose} = require ('mongoose')
const { model} =require('mongoose');
const projectSchema = new Schema({
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    pledgedAmount: { type: Number, default: 0 },
    createdBy: { type: String, required: true },
});

const Project = model('Project_Details', projectSchema)
module.exports = Project;
