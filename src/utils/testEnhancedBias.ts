// Quick test for enhanced bias detection system
import { enhancedBiasDetector } from './enhancedBiasDatasets';

// Test cases to verify enhanced bias detection
export function testEnhancedBiasDetection() {
  console.log('🧪 Testing Enhanced Bias Detection System...\n');
  
  // Test 1: Gender Stereotyping
  const test1 = "Women are too emotional for leadership roles";
  const result1 = enhancedBiasDetector.detectBias(test1);
  console.log(`Test 1: "${test1}"`);
  console.log(`Result: ${result1.hasBias ? 'BIAS DETECTED' : 'No bias'}`);
  console.log(`Types: ${result1.biasTypes.join(', ')}`);
  console.log(`Confidence: ${(result1.confidence * 100).toFixed(0)}%`);
  console.log(`Severity: ${result1.severity}\n`);
  
  // Test 2: Educational Bias
  const test2 = "IIT graduates are always better than others";
  const result2 = enhancedBiasDetector.detectBias(test2);
  console.log(`Test 2: "${test2}"`);
  console.log(`Result: ${result2.hasBias ? 'BIAS DETECTED' : 'No bias'}`);
  console.log(`Types: ${result2.biasTypes.join(', ')}`);
  console.log(`Confidence: ${(result2.confidence * 100).toFixed(0)}%`);
  console.log(`Severity: ${result2.severity}\n`);
  
  // Test 3: Positive Statement (should NOT detect bias)
  const test3 = "All people should be treated equally";
  const result3 = enhancedBiasDetector.detectBias(test3);
  console.log(`Test 3: "${test3}"`);
  console.log(`Result: ${result3.hasBias ? 'BIAS DETECTED' : 'No bias'}`);
  console.log(`Types: ${result3.biasTypes.join(', ')}`);
  console.log(`Confidence: ${(result3.confidence * 100).toFixed(0)}%`);
  console.log(`Severity: ${result3.severity}\n`);
  
  // Test 4: Toxic Language
  const test4 = "This is absolutely stupid and terrible";
  const result4 = enhancedBiasDetector.detectBias(test4);
  console.log(`Test 4: "${test4}"`);
  console.log(`Result: ${result4.hasBias ? 'BIAS DETECTED' : 'No bias'}`);
  console.log(`Types: ${result4.biasTypes.join(', ')}`);
  console.log(`Confidence: ${(result4.confidence * 100).toFixed(0)}%`);
  console.log(`Severity: ${result4.severity}\n`);
  
  // Test 5: Groupthink
  const test5 = "Everyone agrees with him, let's finalize this";
  const result5 = enhancedBiasDetector.detectBias(test5);
  console.log(`Test 5: "${test5}"`);
  console.log(`Result: ${result5.hasBias ? 'BIAS DETECTED' : 'No bias'}`);
  console.log(`Types: ${result5.biasTypes.join(', ')}`);
  console.log(`Confidence: ${(result5.confidence * 100).toFixed(0)}%`);
  console.log(`Severity: ${result5.severity}\n`);
  
  // Show training statistics
  const stats = enhancedBiasDetector.getTrainingStats();
  console.log('📊 Training Dataset Statistics:');
  console.log(`Total Examples: ${stats.totalExamples}`);
  console.log(`Biased Examples: ${stats.biasedExamples}`);
  console.log(`Positive Examples: ${stats.positiveExamples}`);
  console.log(`Bias Types Covered: ${stats.coverage}`);
  console.log('\n🎯 Bias Types Coverage:');
  Object.entries(stats.biasTypeCounts).forEach(([type, count]) => {
    console.log(`  ${type}: ${count} examples`);
  });
  
  console.log('\n✅ Enhanced Bias Detection System Test Complete!');
}

// Export for use in other parts of the application
export default testEnhancedBiasDetection;
