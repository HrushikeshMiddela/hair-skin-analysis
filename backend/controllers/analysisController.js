const Analysis = require('../models/Analysis');

exports.saveAnalysis = async (req, res) => {
  const { result, type } = req.body;
  try {
    const newAnalysis = new Analysis({
      userId: req.user.userId,
      result,
      type
    });
    await newAnalysis.save();
    res.status(201).json({ message: 'Analysis saved' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await Analysis.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
