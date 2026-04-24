export const distanceMatrix = {
  "SM Baguio": { "SM Baguio": 0, "Burnham Park": 1.2, "Session Road": 0.8, "Wright Park": 3.5, "Baguio Cathedral": 1.0, "Public Market Area": 1.5 },
  "Burnham Park": { "SM Baguio": 1.2, "Burnham Park": 0, "Session Road": 1.0, "Wright Park": 3.2, "Baguio Cathedral": 1.1, "Public Market Area": 0.8 },
  "Session Road": { "SM Baguio": 0.8, "Burnham Park": 1.0, "Session Road": 0, "Wright Park": 3.0, "Baguio Cathedral": 0.5, "Public Market Area": 1.2 },
  "Wright Park": { "SM Baguio": 3.5, "Burnham Park": 3.2, "Session Road": 3.0, "Wright Park": 0, "Baguio Cathedral": 3.5, "Public Market Area": 3.8 },
  "Baguio Cathedral": { "SM Baguio": 1.0, "Burnham Park": 1.1, "Session Road": 0.5, "Wright Park": 3.5, "Baguio Cathedral": 0, "Public Market Area": 1.3 },
  "Public Market Area": { "SM Baguio": 1.5, "Burnham Park": 0.8, "Session Road": 1.2, "Wright Park": 3.8, "Baguio Cathedral": 1.3, "Public Market Area": 0 }
};

export const calculateTravelTime = (distance, mode) => {
  const speeds = {
    'On Foot': 4.5,
    'By Vehicle': 15,
    'Commuting': 10
  };
  const speed = speeds[mode] || 4.5;
  return Math.round((distance / speed) * 60);
};
