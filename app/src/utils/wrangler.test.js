import {
  getAvailableDates,
  getMonthSelections,
  getLastYear,
  getGeoJsonData,
  getChartData
} from './wrangler'

describe('when all the dates are parsed from query result', () => {
  it('should give all the years and indicate whether month is selectable', () => {
    const mockQueryResult = [
      { year: 2016, month: 1, count: 2 },
      { year: 2016, month: 1, count: 2 },
      { year: 2016, month: 2, count: 2 },
      { year: 2016, month: 3, count: 2 },
      { year: 2016, month: 12, count: 2 },
      { year: 2017, month: 4, count: 2 },
      { year: 2017, month: 5, count: 0 }
    ]
    const expectedDates = {
      '2016': [
        {
          month: '1',
          year: '2016',
          selectable: true
        },
        {
          month: '2',
          year: '2016',
          selectable: true
        },
        {
          month: '3',
          year: '2016',
          selectable: true
        },
        {
          month: '4',
          year: '2016',
          selectable: false
        },
        {
          month: '5',
          year: '2016',
          selectable: false
        },
        {
          month: '6',
          year: '2016',
          selectable: false
        },
        {
          month: '7',
          year: '2016',
          selectable: false
        },
        {
          month: '8',
          year: '2016',
          selectable: false
        },
        {
          month: '9',
          year: '2016',
          selectable: false
        },
        {
          month: '10',
          year: '2016',
          selectable: false
        },
        {
          month: '11',
          year: '2016',
          selectable: false
        },
        {
          month: '12',
          year: '2016',
          selectable: true
        }
      ],
      '2017': [
        {
          month: '1',
          year: '2017',
          selectable: false
        },
        {
          month: '2',
          year: '2017',
          selectable: false
        },
        {
          month: '3',
          year: '2017',
          selectable: false
        },
        {
          month: '4',
          year: '2017',
          selectable: true
        },
        {
          month: '5',
          year: '2017',
          selectable: false
        },
        {
          month: '6',
          year: '2017',
          selectable: false
        },
        {
          month: '7',
          year: '2017',
          selectable: false
        },
        {
          month: '8',
          year: '2017',
          selectable: false
        },
        {
          month: '9',
          year: '2017',
          selectable: false
        },
        {
          month: '10',
          year: '2017',
          selectable: false
        },
        {
          month: '11',
          year: '2017',
          selectable: false
        },
        {
          month: '12',
          year: '2017',
          selectable: false
        }
      ]
    }
    const dates = getAvailableDates(mockQueryResult)
    expect(dates).toEqual(expectedDates)
  })
})

describe('when geojson data of selected year and month is parsed', () => {
  it('should give data in geojson format and ignore points with no parking violations', () => {
    const expectedData = {
      type: 'FeatureCollection',
      features: [
        {
          geometry: {
            coordinates: [24.9549652, 60.1868272],
            type: 'Point'
          },
          properties: {
            value: 1,
            address: 'Aadolfinkatu 11'
          },
          type: 'Feature'
        }
      ]
    }
    const geoJsonData = getGeoJsonData('2016', '4', mockdata)
    expect(geoJsonData).toEqual(expectedData)
  })
})

describe('when last year is parsed', () => {
  it('should return last year', () => {
    expect(getLastYear(mockdata)).toBe('2017')
  })
})

describe('when month selections are collected', () => {
  it('should parse all the years and months grouped by year and indicate whether month is selectable', () => {
    const expectedMonthSelections = {
      '2015': [
        {
          month: '1',
          year: '2015',
          selectable: true
        },
        {
          month: '2',
          year: '2015',
          selectable: true
        },
        {
          month: '3',
          year: '2015',
          selectable: true
        },
        {
          month: '4',
          year: '2015',
          selectable: true
        },
        {
          month: '5',
          year: '2015',
          selectable: true
        },
        {
          month: '6',
          year: '2015',
          selectable: true
        },
        {
          month: '7',
          year: '2015',
          selectable: true
        },
        {
          month: '8',
          year: '2015',
          selectable: true
        },
        {
          month: '9',
          year: '2015',
          selectable: true
        },
        {
          month: '10',
          year: '2015',
          selectable: true
        },
        {
          month: '11',
          year: '2015',
          selectable: true
        },
        {
          month: '12',
          year: '2015',
          selectable: true
        }
      ],
      '2016': [
        {
          month: '1',
          year: '2016',
          selectable: false
        },
        {
          month: '2',
          year: '2016',
          selectable: true
        },
        {
          month: '3',
          year: '2016',
          selectable: true
        },
        {
          month: '4',
          year: '2016',
          selectable: true
        },
        {
          month: '5',
          year: '2016',
          selectable: true
        },
        {
          month: '6',
          year: '2016',
          selectable: true
        },
        {
          month: '7',
          year: '2016',
          selectable: true
        },
        {
          month: '8',
          year: '2016',
          selectable: true
        },
        {
          month: '9',
          year: '2016',
          selectable: true
        },
        {
          month: '10',
          year: '2016',
          selectable: true
        },
        {
          month: '11',
          year: '2016',
          selectable: true
        },
        {
          month: '12',
          year: '2016',
          selectable: true
        }
      ],
      '2017': [
        {
          month: '1',
          year: '2017',
          selectable: true
        },
        {
          month: '2',
          year: '2017',
          selectable: true
        },
        {
          month: '3',
          year: '2017',
          selectable: true
        },
        {
          month: '4',
          year: '2017',
          selectable: true
        },
        {
          month: '5',
          year: '2017',
          selectable: true
        },
        {
          month: '6',
          year: '2017',
          selectable: false
        },
        {
          month: '7',
          year: '2017',
          selectable: false
        },
        {
          month: '8',
          year: '2017',
          selectable: false
        },
        {
          month: '9',
          year: '2017',
          selectable: false
        },
        {
          month: '10',
          year: '2017',
          selectable: false
        },
        {
          month: '11',
          year: '2017',
          selectable: false
        },
        {
          month: '12',
          year: '2017',
          selectable: false
        }
      ]
    }
    const monthSelections = getMonthSelections(mockdata)
    expect(monthSelections).toEqual(expectedMonthSelections)
  })
})

describe('when chart data of selected address are parsed', () => {
  it('should collect all the data points and convert year and month to Date object', () => {
    const address = 'Aadolfinkatu 11'
    const expectedChartData = [
      {
        date: new Date(2016, 1 - 1, 1, 0, 0, 0, 0),
        value: 0
      },
      {
        date: new Date(2016, 2 - 1, 1, 0, 0, 0, 0),
        value: 1
      },
      {
        date: new Date(2016, 3 - 1, 1, 0, 0, 0, 0),
        value: 3
      },
      {
        date: new Date(2016, 4 - 1, 1, 0, 0, 0, 0),
        value: 1
      },
      {
        date: new Date(2016, 5 - 1, 1, 0, 0, 0, 0),
        value: 1
      },
      {
        date: new Date(2016, 6 - 1, 1, 0, 0, 0, 0),
        value: 2
      },
      {
        date: new Date(2016, 7 - 1, 1, 0, 0, 0, 0),
        value: 0
      },
      {
        date: new Date(2016, 8 - 1, 1, 0, 0, 0, 0),
        value: 0
      },
      {
        date: new Date(2016, 9 - 1, 1, 0, 0, 0, 0),
        value: 1
      },
      {
        date: new Date(2016, 10 - 1, 1, 0, 0, 0, 0),
        value: 2
      },
      {
        date: new Date(2016, 11 - 1, 1, 0, 0, 0, 0),
        value: 1
      },
      {
        date: new Date(2016, 12 - 1, 1, 0, 0, 0, 0),
        value: 1
      },
      {
        date: new Date(2017, 1 - 1, 1, 0, 0, 0, 0),
        value: 1
      },
      {
        date: new Date(2017, 2 - 1, 1, 0, 0, 0, 0),
        value: 1
      },
      {
        date: new Date(2017, 3 - 1, 1, 0, 0, 0, 0),
        value: 5
      },
      {
        date: new Date(2017, 4 - 1, 1, 0, 0, 0, 0),
        value: 1
      },
      {
        date: new Date(2017, 5 - 1, 1, 0, 0, 0, 0),
        value: 1
      },
      {
        date: new Date(2017, 6 - 1, 1, 0, 0, 0, 0),
        value: 0
      },
      {
        date: new Date(2017, 7 - 1, 1, 0, 0, 0, 0),
        value: 0
      },
      {
        date: new Date(2017, 8 - 1, 1, 0, 0, 0, 0),
        value: 0
      },
      {
        date: new Date(2017, 9 - 1, 1, 0, 0, 0, 0),
        value: 0
      },
      {
        date: new Date(2017, 10 - 1, 1, 0, 0, 0, 0),
        value: 0
      },
      {
        date: new Date(2017, 11 - 1, 1, 0, 0, 0, 0),
        value: 0
      },
      {
        date: new Date(2017, 12 - 1, 1, 0, 0, 0, 0),
        value: 0
      }
    ]
    const chartData = getChartData(mockdata, address)
    expect(chartData).toEqual(expectedChartData)
  })
})


const mockdata = {
  "Aadolfinkatu 11": {
    "lat": 60.1868272,
    "lon": 24.9549652,
    "violationCounts": {
      "2017": {
        "1": 1,
        "2": 1,
        "3": 5,
        "4": 1,
        "5": 1,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "11": 0,
        "12": 0
      },
      "2016": {
        "1": 0,
        "2": 1,
        "3": 3,
        "4": 1,
        "5": 1,
        "6": 2,
        "7": 0,
        "8": 0,
        "9": 1,
        "10": 2,
        "11": 1,
        "12": 1
      }
    }
  },
  "Aadolfinkatu 13": {
    "lat": 60.1867665,
    "lon": 24.9541619,
    "violationCounts": {
      "2017": {
        "1": 2,
        "2": 1,
        "3": 3,
        "4": 0,
        "5": 1,
        "6": 0,
        "7": 0,
        "8": 0,
        "9": 0,
        "10": 0,
        "11": 0,
        "12": 0
      },
      "2016": {
        "1": 0,
        "2": 1,
        "3": 1,
        "4": 0,
        "5": 0,
        "6": 3,
        "7": 1,
        "8": 2,
        "9": 2,
        "10": 0,
        "11": 0,
        "12": 0
      },
      "2015": {
        "1": 2,
        "2": 3,
        "3": 4,
        "4": 5,
        "5": 3,
        "6": 3,
        "7": 1,
        "8": 2,
        "9": 2,
        "10": 1,
        "11": 4,
        "12": 5
      }
    }
  }
}
