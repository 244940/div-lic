const User = require('../models/User');
const TestResult = require('../models/TestResult');
const testEvaluationService = require('../services/testEvaluationService');

exports.createTest = async (req, res) => {
  try {
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    await user.save();

    const testResult = new TestResult({
      user: user._id,
      physicalTest: {
        colorBlindness: req.body.colorBlindness,
        hyperopia: req.body.hyperopia,
        astigmatism: req.body.astigmatism,
        physicalResponse: req.body.physicalResponse
      },
      theoryTest: {
        trafficSigns: req.body.trafficSigns,
        trafficLines: req.body.trafficLines,
        givingWay: req.body.givingWay
      },
      practicalTest: req.body.practicalTest
    });

    testEvaluationService.evaluatePhysicalTest(testResult);
    testEvaluationService.evaluateTheoryTest(testResult);
    testEvaluationService.evaluateOverallStatus(testResult);

    await testResult.save();

    res.status(201).json(testResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTest = async (req, res) => {
  try {
    const testResult = await TestResult.findById(req.params.id);
    if (!testResult) return res.status(404).json({ message: 'Test result not found' });

    Object.assign(testResult, req.body);

    testEvaluationService.evaluatePhysicalTest(testResult);
    testEvaluationService.evaluateTheoryTest(testResult);
    testEvaluationService.evaluateOverallStatus(testResult);

    await testResult.save();

    res.json(testResult);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTest = async (req, res) => {
  try {
    const testResult = await TestResult.findByIdAndDelete(req.params.id);
    if (!testResult) return res.status(404).json({ message: 'Test result not found' });

    res.json({ message: 'Test result deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTestResult = async (req, res) => {
  try {
    const testResult = await TestResult.findById(req.params.id).populate('user');
    if (!testResult) return res.status(404).json({ message: 'Test result not found' });

    res.json(testResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};