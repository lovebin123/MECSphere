const express = require('express');
const router = express.Router()
const aModel = require('../models/ansModel');
const qModel = require('../models/qModel');

// Route to get all answers
router.get('/', async (req, res, next) => {
    try {
        const answers = await aModel.find();
        res.json(answers);
    } catch (err) {
        next(err);
    }
})

router.post('/add', async (req, res, next) => {
    const { ans, qid, user } = req.body;

    try {
        const q = await qModel.findById(qid);
        const question = q.description
        const newAns = new aModel({ ans,qid, user, question});
        await newAns.save();
        res.status(201).json(newAns);
    } catch (err) {
        next(err);
    }
})

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

module.exports = router;
  