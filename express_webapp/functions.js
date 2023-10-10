// Simple creation of distance calculation functions

// To avoid writing '' each time
const { acos, cos, sin, PI } = Math;

/**
 * Returns the distance in meters between two GPS points expressed in degrees.
 * @param lat1 Latitude of the first GPS point
 * @param long1 Longitude of the first GPS point
 * @param lat2 Latitude of the second GPS point
 * @param long2 Longitude of the second GPS point
 * @return The distance between the two GPS points in meters
 */
function calculDistance2PointsGPS(lat1, long1, lat2, long2) {
    R = 6378.137; // km

    // Convert to radians
    lat1 = degreesToRadians(lat1);
    long1 = degreesToRadians(long1);
    lat2 = degreesToRadians(lat2);
    long2 = degreesToRadians(long2);

    // Calculate and return the distance 
    return R * acos(sin(lat1) * sin(lat2) + cos(lat1) * cos(lat2) * cos(long2 - long1));
}

/**
 * Returns the distance in meters of the route passed as a parameter. The route is
 * defined by an ordered array of GPS points.
 * @param array $parcours The array containing GPS points
 * @return float The distance of the route
 */
function calculDistanceTrajet(parcours) {
    distance = 0;

    // For each GPS point whisout the last point
    for (i = 0; i < parcours.length - 1; i++) {

        // Calculate the distance between the current GPS point and the next one
        distance += calculDistance2PointsGPS(parcours[i]["latitude"], parcours[i]["longitude"],
        parcours[i + 1]["latitude"], parcours[i + 1]["longitude"]);
    }

    return distance;
}

/**
 * Convert degrees to raidans 
 * @param degrees to convert
 * @returns the angle in radians
 */
function degreesToRadians(degrees) {
  return (PI * degrees) / 180;
}

/**
 * Returns the minimum, maximum and average heart rate of the route passed as a parameter. The route is
 * @param {*} parcours the array containing GPS points and heart rate
 * @returns the minimum, maximum and average heart rate
 */
function calculateHeartRateAll(parcours) {
  let hrMin = 999;
  let hrMax = 0;
  let hrTot = 0;

  for (let i = 0; i < parcours.length; i++) {
    hrTot += parcours[i].cardio_frequency;
    if (parcours[i].cardio_frequency < hrMin) {
      hrMin = parcours[i].cardio_frequency;
    }
    if (parcours[i].cardio_frequency > hrMax) {
      hrMax = parcours[i].cardio_frequency;
    }
  }
  const hrMoy = Math.round(hrTot / parcours.length);
  return [hrMin, hrMax, hrMoy];
}

/**
 * Returns the duration of the activity
 * @param heureDebut the start time of the activity
 * @param heureFin the end time of the activity
 * @returns a string of the duration of the activity in format "hh:mm:ss"
 */
function calculDuree(heureDebut, heureFin) {
  // Conversion des heures en secondes
  const debutEnSecondes = heureEnSecondes(heureDebut);
  const finEnSecondes = heureEnSecondes(heureFin);

  // Calcul de la différence en secondes
  const differenceEnSecondes = finEnSecondes - debutEnSecondes;

  // Conversion de la différence en secondes en heures, minutes et secondes
  const heures = Math.floor(differenceEnSecondes / 3600);
  const minutes = Math.floor((differenceEnSecondes % 3600) / 60);
  const secondes = differenceEnSecondes % 60;

  return `${heures}:${minutes}:${secondes}`; // Formatage de la durée
}

/**
 * Returns the time in seconds
 * @param heure the time to convert
 * @returns the time in seconds
 */
function heureEnSecondes(heure) {
  const [heures, minutes, secondes] = heure.split(":");
  return parseInt(heures) * 3600 + parseInt(minutes) * 60 + parseInt(secondes);
}


module.exports = {
  calculDistanceTrajet,
  calculateHeartRateAll,
  calculDuree
}

// Tests
activityData = [
    {"time": "13:00:00","cardio_frequency": 99,"latitude": 47.644795,"longitude": -2.776605,"altitude": 18 },
    {"time":"13:00:05","cardio_frequency":100,"latitude":47.646870,"longitude":-2.778911,"altitude":18},
    {"time":"13:00:10","cardio_frequency":102,"latitude":47.646197,"longitude":-2.780220,"altitude":18},
    {"time":"13:00:15","cardio_frequency":100,"latitude":47.646992,"longitude":-2.781068,"altitude":17},
    {"time":"13:00:20","cardio_frequency":98,"latitude":47.647867,"longitude":-2.781744,"altitude":16},
    {"time":"13:00:25","cardio_frequency":103,"latitude":47.648510,"longitude":-2.780145,"altitude":16}
]
    
// console.log(calculDistanceTrajet(activityData));
