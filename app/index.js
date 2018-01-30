$(document).ready(function() {
  window.mapData = createMapData(2017, 1);
  window.geojsonData = createGeoJsonData(window.mapData)
  var map = addMapboxMap(window.config.mapBoxToken);
  loadDataToMap(map, window.geojsonData);
});

function loadDataToMap(map, geojsonData) {
  map.on('load', function() {
    map.addSource('parkingViolations', {
      type: 'geojson',
      data: geojsonData
    });

    map.addLayer({
      id: 'parkingViolationsHeat',
      type: 'heatmap',
      source: 'parkingViolations',
      maxzoom: 19,
      paint: {
        'heatmap-weight': {
          property: 'value',
          type: 'exponential',
          stops: [
            [1, 0],
            [30, 1]
          ]
        },
        'heatmap-intensity': {
          stops: [
            [11, 1],
            [19, 3]
          ]
        },
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(253, 240, 217, 0)',
          0.2, '#fdcc8a',
          0.4, '#fc8d59',
          0.6, '#e34a33',
          0.8, '#b30000'
        ],
        'heatmap-radius': {
          stops: [
            [11, 15],
            [15, 20]
          ]
        },
        'heatmap-opacity': {
          default: 1,
          stops: [
            [14, 1],
            [15, 0]
          ]
        },
      }
    }, 'waterway-label');

    map.addLayer({
      id: 'parkingViolationsPoint',
      type: 'circle',
      source: 'parkingViolations',
      minzoom: 14,
      paint: {
        'circle-radius': {
          property: 'dbh',
          type: 'exponential',
          stops: [
            [{ zoom: 15, value: 1 }, 5],
            [{ zoom: 15, value: 20 }, 10],
            [{ zoom: 22, value: 1 }, 20],
            [{ zoom: 22, value: 20 }, 50],
          ]
        },
        'circle-color': {
          property: 'dbh',
          type: 'exponential',
          stops: [
            [0, 'rgba(236,222,239,0)'],
            [10, 'rgb(236,222,239)'],
            [20, 'rgb(208,209,230)'],
            [30, 'rgb(166,189,219)'],
            [40, 'rgb(103,169,207)'],
            [50, 'rgb(28,144,153)'],
            [60, 'rgb(1,108,89)']
          ]
        },
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        'circle-opacity': {
          stops: [
            [14, 0],
            [15, 1]
          ]
        }
      }
    }, 'waterway-label');
  });

  map.on('click', 'parkingViolationsPoint', function(e) {
    new mapboxgl.Popup()
      .setLngLat(e.features[0].geometry.coordinates)
      .setHTML('<b>Number of parking tickets:</b> ' + e.features[0].properties.value)
      .addTo(map);
  });
}

function addMapboxMap(token) {
  mapboxgl.accessToken = token;
  var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [24.938278, 60.223965],
      zoom: 11
  });
  return map;
}

function createGeoJsonData(mapData) {
  return {
    type: 'FeatureCollection',
    features: _.map(mapData, convertToGeoJsonFeature)
  };
}

function convertToGeoJsonFeature(datum) {
  return {
    type: 'Feature',
    properties: {
      value: datum.value
    },
    geometry: {
      type: 'Point',
      coordinates: [datum.lon, datum.lat]
    }
  };
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
