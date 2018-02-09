const appData = require('./appData.json')

const loadGeoJsonData = (year, month) => {
  const parseAddress = (addressData, address) => {
    return {
      address: address,
      lat: addressData.lat,
      lon: addressData.lon,
      value: _.get(addressData, 'violationCounts[${year}][${month}]', 0)
    }
  }

  const isValid = (datum) => {
    return datum.value > 0 && _.isNumber(datum.lat) && _.isNumber(datum.lon)
  }

  const convertToGeoJsonFeature = (datum) => {
    return {
      type: 'Feature',
      properties: {
        value: datum.value
      },
      geometry: {
        type: 'Point',
        coordinates: [datum.lon, datum.lat]
      }
    }
  }

  const parsedData = _.chain(appData)
    .map(parseAddress)
    .filter(isValid)
    .value()

  return {
    type: 'FeatureCollection',
    features: _.map(parsedData, convertToGeoJsonFeature)
  }
}


export {
  loadGeoJsonData
}
