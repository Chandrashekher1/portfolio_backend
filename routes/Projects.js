const admin = require('../middleware/admin')
const auth = require('../middleware/auth')
const multer = require('multer')
const storage = require('../config/storage')
const upload = multer({ storage });
const express = require('express');
const router = express.Router();
const { Projects, validate } = require('../models/Projects');
const path = require('path')

router.get('/', async (req, res) => {
    const projects = await Projects.find().sort({ createdAt: -1 })
    res.send(projects)
});

router.post('/',[auth,admin], async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).json(error.details[0].message)
    
    try {
        let project = new Projects({
            title: req.body.title,
            description: req.body.description,
            technologies: req.body.technologies?.split(',') || [],
            livelink: req.body.livelink,
            repolink: req.body.repolink,
        })
        project = await project.save();
        res.send(project);
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong while creating the project.");
    }
})

router.put('/:id', [auth,admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    try {
        const project = await Projects.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!project) return res.status(404).json({ message: "Project not found." });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while updating the project." });
    }
});

router.delete('/:id', [auth,admin], async (req, res) => {
    try {
        const project = await Projects.findByIdAndDelete(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found." });
        res.json({ message: "Project deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while deleting the project." });
    }
});

module.exports = router;