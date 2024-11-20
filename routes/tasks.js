onst express = require('express');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ error: 'Access denied' });
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

router.post('/', authenticate, async (req, res) => {
    const task = new Task({ ...req.body, userId: req.user.id });
    try {
        const savedTask = await task.save();
        res.json(savedTask);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Additional routes for fetching, updating, deleting tasks...
module.exports = router;
