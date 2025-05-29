const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csvtojson');
const Task = require('../models/Task');
const Agent = require('../models/Agent');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware
const xlsx = require('xlsx'); // Add at top


// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Protect upload route
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    const ext = req.file.originalname.split('.').pop().toLowerCase();

  if (!['csv', 'xlsx', 'xls'].includes(ext)) {
    return res.status(400).json({ message: 'Only CSV, XLSX, and XLS files are allowed' });
  }

  let items = [];

  if (ext === 'csv') {
    const csvData = req.file.buffer.toString();
    items = await csv().fromString(csvData);
  } else {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    items = xlsx.utils.sheet_to_json(sheet);
  }
  // Filter out rows missing required fields
items = items.filter(item => item.FirstName && item.Phone);

if (items.length === 0) {
  return res.status(400).json({ message: 'No valid data rows found. Each row must contain FirstName and Phone.' });
}

    const agents = await Agent.find();

    if (agents.length < 1) {
      return res.status(400).json({ message: 'No agents available to assign tasks' });
    }

    const distributedTasks = [];
    items.forEach((item, index) => {
      const agentIndex = index % agents.length;
      distributedTasks.push({
        firstName: item.FirstName,
        phone: item.Phone,
        notes: item.Notes,
        assignedAgent: agents[agentIndex]._id
      });
    });

    const savedTasks = await Task.insertMany(distributedTasks);

    res.status(200).json({ message: 'Tasks distributed successfully', data: savedTasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error processing file' });
  }
});

// Protect this route as well (optional but recommended)
router.get('/agent/:agentId', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedAgent: req.params.agentId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

// ✅ Route: Get all tasks with agent information
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find().populate('assignedAgent');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});


module.exports = router;
