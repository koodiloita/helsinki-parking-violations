import * as _ from 'lodash'

const getChartData = (data, address) => {
  const addressData = _.get(data[address], 'violationCounts') || {}
  const chartDataChunks = _.map(addressData, (yearCounts, year) => {
    return _.map(yearCounts, (monthCount, month) => {
      return {
        date: new Date(_.parseInt(year), _.parseInt(month) - 1, 1, 0, 0, 0, 0),
        value: monthCount
      }
    })
  })
  return _.flatten(chartDataChunks)
}

const getMonthSelections = (data) => {
  const years = parseYears(data)
  return _.reduce(years, (result, year) => {
    const violationCountsOfYear = _.map(data, (datum) => datum.violationCounts[year] || initializeCounts())
    const violationsSum = sumViolationsPerMonth(violationCountsOfYear)
    result[year] = _.map(violationsSum, (sum, month) => {
      return {
        month,
        year,
        selectable: sum > 0
      }
    })
    return result
  }, {})
}

const getLastYear = (data) => {
  const years = _.map(parseYears(data), (year) => _.parseInt(year))
  return `${_.max(years)}`
}

const getGeoJsonData = (year, month, data) => {
  const parseAddress = (addressData, address) => {
    return {
      address: address,
      lat: addressData.lat,
      lon: addressData.lon,
      value: _.get(addressData, `violationCounts[${year}][${month}]`, 0)
    }
  }

  const parsedData = _.chain(data)
    .map(parseAddress)
    .filter(addressIsValid)
    .value()

  return {
    type: 'FeatureCollection',
    features: _.map(parsedData, convertToGeoJsonFeature)
  }
}

const addressIsValid = (datum) => {
  return datum.value > 0 && _.isNumber(datum.lat) && _.isNumber(datum.lon)
}

const convertToGeoJsonFeature = (datum) => {
  return {
    type: 'Feature',
    properties: {
      value: datum.value,
      address: datum.address
    },
    geometry: {
      type: 'Point',
      coordinates: [datum.lon, datum.lat]
    }
  }
}

const sumViolationsPerMonth = (violationCounts) => {
  const months = getMonths()
  const initialCounts = initializeCounts()
  return _.reduce(violationCounts, (result, item) => {
    _.forEach(months, (month) => result[month] += _.parseInt(item[month]))
    return result
  }, initialCounts)
}

const getMonths = () => _.map(_.range(1,13), (month) => `${month}`)

const initializeCounts = () => _.reduce(getMonths(), (result, month) => {
  result[month] = 0
  return result
}, {})

const parseYears = (data) => {
  return _.chain(data)
    .map((datum) => _.keys(datum.violationCounts))
    .flatten()
    .uniq()
    .value()
}

export {
  getChartData,
  getLastYear,
  getMonthSelections,
  getGeoJsonData
}
