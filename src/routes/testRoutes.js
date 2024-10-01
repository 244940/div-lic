const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router.post('/', testController.createTest);
router.put('/:id', testController.updateTest);
router.delete('/:id', testController.deleteTest);
router.get('/:id', testController.getTestResult);

module.exports = router;