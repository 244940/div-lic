const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/daily', reportController.getDailyReport);
router.get('/search', reportController.searchTestResults);

module.exports = router;