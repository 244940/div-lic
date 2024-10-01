const TestResult = require('../models/TestResult');

exports.getDailyReport = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const passedCount = await TestResult.countDocuments({
      createdAt: { $gte: today },
      status: 'Passed'
    });

    const failedCount = await TestResult.countDocuments({
      createdAt: { $gte: today },
      status: 'Failed'
    });

    res.json({ passedCount, failedCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchTestResults = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await TestResult.find({
      $or: [
        { 'user.firstName': { $regex: query, $options: 'i' } },
        { 'user.lastName': { $regex: query, $options: 'i' } }
      ]
    }).populate('user');

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};