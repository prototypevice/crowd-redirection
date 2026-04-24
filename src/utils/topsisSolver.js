import { distanceMatrix, calculateTravelTime } from '../data/distanceMatrix';

export const normalize = (value, min = 0, max = 100) => {
  return (value - min) / (max - min);
};

const normalizeName = (name) => name === 'SM City Baguio' ? 'SM Baguio' : name;

/**
 * Executes a mock TOPSIS multi-criteria decision algorithm to find the optimal target.
 * @param {string} currentLocationName - The name of the currently selected location.
 * @param {object} sites - The MOCK_DATA dictionary.
 * @param {object} userPrefs - The user's preferences object.
 * @returns {Array} The top 3 alternative site objects.
 */
export const calculateRedirection = (currentLocationName, sites, userPrefs) => {
  if (!currentLocationName || !sites[currentLocationName]) return [];
  
  const startLocNameNorm = normalizeName(currentLocationName);

  // 1. Filter phase
  const alternatives = Object.entries(sites)
    .filter(([name]) => name !== currentLocationName)
    .map(([name, data]) => {
      const targetNameNorm = normalizeName(name);
      
      let distance = distanceMatrix[startLocNameNorm]?.[targetNameNorm];
      if (distance === undefined) {
          distance = data.distance; // Fallback
      }
      
      const calculatedTime = calculateTravelTime(distance, userPrefs.travelMode);
      return { name, ...data, calculatedTime, distance };
    })
    .filter((data) => data.calculatedTime <= userPrefs.maxTravelTime)
    .filter((data) => userPrefs.environments[data.environment])
    .filter((data) => userPrefs.includePaid ? true : !data.isPaid); // Exclude paid if includePaid is false
    
  if (alternatives.length === 0) {
    return [];
  }

  // 2. Mock TOPSIS Scoring phase
  // Find max distance to normalize dynamically
  const maxDistance = Math.max(...alternatives.map(a => a.distance), 1);

  alternatives.forEach(alt => {
    let throughputScore = normalize(alt.throughputScore);
    let scenicValue = normalize(alt.scenicValue);
    
    // Invert distance: closer distance -> higher score contribution
    let invDistanceScore = 1 - normalize(alt.distance, 0, maxDistance);

    let finalScore = 0;

    // Dynamic Weighting based on navigationGoal
    if (userPrefs.navigationGoal === 'Efficiency') {
      finalScore = (throughputScore * 0.7) + (invDistanceScore * 0.3);
    } else { // Leisure
      finalScore = (scenicValue * 0.7) + (invDistanceScore * 0.3);
    }

    // Penalties
    if (userPrefs.groupSize > 3 && alt.seatingCapacity === 'Low') {
      finalScore -= 0.5;
    }

    alt.finalScore = finalScore;
  });

  // 3. Selection
  alternatives.sort((a, b) => b.finalScore - a.finalScore);
  const topSites = alternatives.slice(0, 3);

  // 4. Generate reason text based on what drove the score
  return topSites.map(bestAlternative => {
    let reasonText = `Optimal available match based on preferences`;
    if (userPrefs.navigationGoal === 'Efficiency') {
      reasonText = `Recommended for high throughput efficiency (${bestAlternative.throughputScore}/100)`;
    } else {
      reasonText = `Recommended for high scenic value (${bestAlternative.scenicValue}/100) and low crowd density`;
    }

    if (userPrefs.groupSize > 3 && bestAlternative.seatingCapacity !== 'Low') {
      reasonText += ` - suitable for large groups`;
    }

    return {
      ...bestAlternative,
      reason: reasonText,
      estimatedTime: bestAlternative.calculatedTime,
      travelMode: userPrefs.travelMode
    };
  });
};
