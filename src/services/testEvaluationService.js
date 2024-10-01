class TestEvaluationService {
    evaluatePhysicalTest(testResult) {
      const passedTests = [
        testResult.physicalTest.colorBlindness,
        testResult.physicalTest.hyperopia,
        testResult.physicalTest.astigmatism,
        testResult.physicalTest.physicalResponse
      ].filter(Boolean).length;
  
      testResult.physicalTest.result = passedTests >= 3 ? 'pass' : 'fail';
    }
  
    evaluateTheoryTest(testResult) {
      const totalScore = testResult.theoryTest.trafficSigns + 
                         testResult.theoryTest.trafficLines + 
                         testResult.theoryTest.givingWay;
      testResult.theoryTest.result = totalScore > 120 ? 'pass' : 'fail';
    }
  
    evaluateOverallStatus(testResult) {
      if (!testResult.physicalTest.result || !testResult.theoryTest.result || !testResult.practicalTest) {
        testResult.status = 'Waiting for consideration';
      } else if (testResult.physicalTest.result === 'pass' && 
                 testResult.theoryTest.result === 'pass' && 
                 testResult.practicalTest === 'pass') {
        testResult.status = 'Passed';
      } else {
        testResult.status = 'Failed';
      }
    }
  }
  
  module.exports = new TestEvaluationService();