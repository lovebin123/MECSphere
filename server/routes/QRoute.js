const express = require('express');
const router = express.Router();
const qModel = require('../models/qModel');

// Route to get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await qModel.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create a new question
// Route to create a new question
router.post('/add', async (req, res) => {
    const { user, description } = req.body;
  
    try {
      const newQAndA = new qModel({ user, description });
      await newQAndA.save();
      res.status(201).json(newQAndA);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

router.delete('/:id', async (req, res) => {
  try {
    const deletedQAndA = await qModel.findByIdAndDelete(req.params.id);
    if (!deletedQAndA) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
