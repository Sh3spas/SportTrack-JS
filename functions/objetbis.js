// Creation of a class CalculDistance using "this" for the distance calculation functions

/**
 * @name CalculDistance
 * @description Classe used to calculate the distance between two points
 */
var CalculDistance = function () {

    this.calculDistance2PointsGPS = function (lat1, long1, lat2, long2) {
        // Convert to radians
        lat1 = this.degreesToRadians(lat1);
        long1 = this.degreesToRadians(long1);
        lat2 = this.degreesToRadians(lat2);
        long2 = this.degreesToRadians(long2);

        // Calculate and return the distance
        return this.R * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1));
    }

    this.calculDistanceTrajet = function (parcours) {
        let distance = 0;

        for (let i = 0; i < parcours.length - 1; i++) {
            distance += this.calculDistance2PointsGPS(
                parcours[i]["latitude"],
                parcours[i]["longitude"],
                parcours[i + 1]["latitude"],
                parcours[i + 1]["longitude"]
            );
        }

        return distance;
    }

    this.degreesToRadians = function (degrees) {
        return (Math.PI * degrees) / 180;
    }
}


// Tests
const activityData = [
  {"time": "13:00:00","cardio_frequency": 99,"latitude": 47.644795,"longitude": -2.776605,"altitude": 18 },
  {"time":"13:00:05","cardio_frequency":100,"latitude":47.646870,"longitude":-2.778911,"altitude":18},
  {"time":"13:00:10","cardio_frequency":102,"latitude":47.646197,"longitude":-2.780220,"altitude":18},
  {"time":"13:00:15","cardio_frequency":100,"latitude":47.646992,"longitude":-2.781068,"altitude":17},
  {"time":"13:00:20","cardio_frequency":98,"latitude":47.647867,"longitude":-2.781744,"altitude":16},
  {"time":"13:00:25","cardio_frequency":103,"latitude":47.648510,"longitude":-2.780145,"altitude":16}
];

const calculDistance = new CalculDistance();
console.log(calculDistance.calculDistanceTrajet(activityData));
