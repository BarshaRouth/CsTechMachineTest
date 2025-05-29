const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');  // Import the middleware

const { addAgent, getAllAgents,deleteAgent } = require('../controllers/agentController');

// Protect routes by adding authMiddleware
router.post('/add', authMiddleware, addAgent);
router.get('/', authMiddleware, getAllAgents);
router.delete('/:id', authMiddleware, deleteAgent);

module.exports = router;
