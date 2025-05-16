const express = require("express");
const  authMiddleware  = require("../middleware/authMiddleware");
const Analysis = require("../models/Analysis");
const User = require("../models/User");

const router = express.Router();

// Save a new analysis and deduct 1 credit
router.post("/analysis", authMiddleware, async (req, res) => {
  const { type, result, probability } = req.body;

  // Make sure req.user exists
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(userId);
    if (!user || user.credits < 1) {
      return res.status(403).json({ message: "Insufficient credits" });
    }

    user.credits -= 1;
    await user.save();

    const analysis = new Analysis({
      userId,
      type,
      result,
      probability,
    });

    await analysis.save();
    res.status(201).json({ message: "Analysis saved" });
  } catch (err) {
    console.error("POST /analysis error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get analysis history
router.get("/analysis", authMiddleware, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const history = await Analysis.find({ userId }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    console.error("GET /analysis error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
