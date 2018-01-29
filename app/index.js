$(document).ready(function() {
  window.mapData = createMapData(2017, 1);
  var map = loadMap('map');
  addCircles(map, window.mapData);
});

function addCircles(map, mapData) {
  _.forEach(mapData, function(datum) {
    L.circle([datum.lat, datum.lon], {
      stroke: false,
      color: 'red',
      fillColor: 'red',
      fillOpacity: 0.5,
      radius: 1*datum.value
    }).addTo(map);
  });
}

function loadMap(id) {
  var map = L.map(id).setView([60.223965, 24.938278], 12);
  var tileLayer =  L.tileLayer('https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tileLayer.addTo(map);
  return map;
}

function createMapData(year, month) {
  var mapToCircleData = function(parkingData, address) {
    return {
      address: address,
      lat: parkingData.lat,
      lon: parkingData.lon,
      value: _.get(parkingData, 'violationCounts[' + year + '][' + month + ']', 0)
    }
  }

  var isValid = function (circle) {
    return circle.value > 0 && _.isNumber(circle.lat) && _.isNumber(circle.lon);
  }

  return _.chain(window.data)
    .map(mapToCircleData)
    .filter(isValid)
    .value();
}