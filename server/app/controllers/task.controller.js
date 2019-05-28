const Task = require('../models/task.model.js');

// Create and Save a new Task
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Task content can not be empty"
        });
    }

    // Create a Task
    const task = new Task({
        title: req.body.title || "Untitled Task",
        content: req.body.content
    });

    // Save Task in the database
    task.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Task."
        });
    });
};

// Retrieve and return all Tasks from the database.
exports.findAll = (req, res) => {
    Task.find()
        .then(tasks => {
            res.send(tasks);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Tasks."
        });
    });
};
// Find a single Task with a TaskID
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
        .then(task => {
            if(!task) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.taskId
        });
    });
};

// Update a Task identified by the TaskID in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Find Task and update it with the request body
    Task.findByIdAndUpdate(req.params.taskId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
        .then(task => {
            if(!task) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.taskId
                });
            }
            res.send(task);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.taskId
        });
    });
};

// Delete a Task with the specified TaskID in the request
exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
        .then(task => {
            if(!task) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.taskId
                });
            }
            res.send({message: "Note deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.taskId
        });
    });
};
