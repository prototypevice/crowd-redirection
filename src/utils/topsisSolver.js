/**
 * Calculates estimated travel time based on distance and mode of transport.
 * @param {number} distanceKm - Distance in kilometers.
 * @param {string} mode - 'On Foot', 'By Vehicle', or 'Commuting'.
 * @returns {number} Estimated travel time in minutes.
 */
export const calculateTravelTime = (distanceKm, mode) => {
  // Estimated average speeds in km/h within city traffic
  const speeds = {
    'On Foot': 5,
    'By Vehicle': 30, 
    'Commuting': 15,
  };

  const speed = speeds[mode] || 5;
  // Convert distance and speed to time in minutes
  return Math.round((distanceKm / speed) * 60);
};

export const normalize = (value, min = 0, max = 100) => {
  return (value - min) / (max - min);
};

/**
 * Executes a mock TOPSIS multi-criteria decision algorithm to find the optimal target.
 * @param {string} currentLocationName - The name of the currently selected location.
 * @param {object} sites - The MOCK_DATA dictionary.
 * @param {object} userPrefs - The user's preferences object.
 * @returns {object|null} The best alternative site object (including name, reason, etc) or error object.
 */
export const calculateRedirection = (currentLocationName, sites, userPrefs) => {
  if (!currentLocationName || !sites[currentLocationName]) return null;
  
  // 1. Filter phase
  const alternatives = Object.entries(sites)
    .filter(([name]) => name !== currentLocationName)
    .map(([name, data]) => {
      const calculatedTime = calculateTravelTime(data.distance, userPrefs.travelMode);
      return { name, ...data, calculatedTime };
    })
    .filter((data) => data.calculatedTime <= userPrefs.maxTravelTime)
    .filter((data) => userPrefs.environments[data.environment])
    .filter((data) => userPrefs.includePaid ? true : !data.isPaid); // Exclude paid if includePaid is false
    
  if (alternatives.length === 0) {
    return { error: 'No matching alternatives found based on preferences.' };
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
  const bestAlternative = alternatives.reduce((best, current) => 
    current.finalScore > best.finalScore ? current : best
  );

  // 4. Generate reason text based on what drove the score
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
};
