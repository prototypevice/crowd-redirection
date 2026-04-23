import { calculateRedirection } from './topsisSolver.js';

const dummySites = {
  'Central Hub': { densityScore: 90, throughputScore: 95, distance: 0.5, environment: 'Indoor', isPaid: false, seatingCapacity: 'Low', scenicValue: 40 },
  'Scenic Point': { densityScore: 40, throughputScore: 45, distance: 5.0, environment: 'Outdoor', isPaid: false, seatingCapacity: 'High', scenicValue: 90 },
  'Balanced Cafe': { densityScore: 60, throughputScore: 70, distance: 1.0, environment: 'Indoor', isPaid: true, seatingCapacity: 'Medium', scenicValue: 80 },
};

console.log('--- TOPSIS Logic Verification Sandbox ---');

// Test 1: Efficiency with Large Group (Expect: Central Hub might be penalized)
const userPrefsEfficiency = {
  maxTravelTime: 30,
  environments: { Indoor: true, Outdoor: true },
  travelMode: 'On Foot',
  groupSize: 5, // Triggers penalty for 'Low' capacity
  navigationGoal: 'Efficiency',
  includePaid: true,
};

console.log('\n[Scenario 1] Goal: Efficiency | Group Size: 5 | Max Time: 30m');
const result1 = calculateRedirection('Central Hub', dummySites, userPrefsEfficiency);
console.log('=> Recommended Target:', result1.name);
console.log('=> Rationale:', result1.reason);
console.log('=> Score Breakdown:');
console.log(`   Final Score: ${result1.finalScore}`);
console.log(`   Travel Time: ${result1.estimatedTime} mins`);

// Test 2: Leisure without Paid venues (Expect: Scenic Point)
const userPrefsLeisure = {
  maxTravelTime: 60,
  environments: { Indoor: true, Outdoor: true },
  travelMode: 'By Vehicle',
  groupSize: 2,
  navigationGoal: 'Leisure',
  includePaid: false, // Balanced Cafe will be excluded
};

console.log('\n[Scenario 2] Goal: Leisure | Include Paid: False | Travel Mode: By Vehicle');
const result2 = calculateRedirection('Scenic Point', dummySites, userPrefsLeisure);
console.log('=> Recommended Target:', result2.name);
console.log('=> Rationale:', result2.reason);
console.log('=> Score Breakdown:');
console.log(`   Final Score: ${result2.finalScore}`);
console.log(`   Travel Time: ${result2.estimatedTime} mins`);

console.log('\n-----------------------------------------');
