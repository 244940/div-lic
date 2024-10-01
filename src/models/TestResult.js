const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  physicalTest: {
    colorBlindness: Boolean,
    hyperopia: Boolean,
    astigmatism: Boolean,
    physicalResponse: Boolean,
    result: { type: String, enum: ['pass', 'fail'] }
  },
  theoryTest: {
    trafficSigns: Number,
    trafficLines: Number,
    givingWay: Number,
    result: { type: String, enum: ['pass', 'fail'] }
  },
  practicalTest: { type: String, enum: ['pass', 'fail'] },
  status: { type: String, enum: ['Waiting for consideration', 'Passed', 'Failed'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('TestResult', testResultSchema);