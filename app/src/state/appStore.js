import { extendObservable, action, computed } from 'mobx'
import { getMonthSelections, getLastYear, getGeoJsonData, getChartData } from '../utils/wrangler'
import * as _ from 'lodash'

const appData = require('../data/appData.json')

class AppStore {
  constructor() {
    const selectedYear = getLastYear(appData)
    const selectedMonth = '1'
    extendObservable(this, {
      displayYear: selectedYear,
      selectedMonth,
      selectedYear,
      setDate: action((year, month) => {
        this.selectedMonth = month
        this.selectedYear = year
        if (year !== this.displayYear) {
          this.displayYear = year
        }
        this.geoJsonData = getGeoJsonData(year, month, appData)
      }),
      hoveredMonth: null,
      hoveredYear: null,
      hoverDate: action((year, month) => {
        this.hoveredMonth = month
        this.hoveredYear = year
      }),
      unhoverDate: action(() => {
        this.hoveredMonth = null
        this.hoveredYear = null
      }),
      monthSelections: getMonthSelections(appData),
      geoJsonData: getGeoJsonData(selectedYear, selectedMonth, appData),
      displayNextYear: computed(() =>  `${_.parseInt(this.displayYear) + 1}`),
      displayPreviousYear: computed(() =>  `${_.parseInt(this.displayYear) - 1}`),
      nextYearActive: computed(() => this.monthSelections[this.displayNextYear]),
      previousYearActive: computed(() => this.monthSelections[this.displayPreviousYear]),
      chooseNextYear: action(() => {
        this.displayYear = `${_.parseInt(this.displayYear) + 1}`
      }),
      choosePreviousYear: action(() => {
        this.displayYear = `${_.parseInt(this.displayYear) - 1}`
      }),
      selectedAddress: null,
      addressChartData: [],
      selectAddress: action((address) => {
        this.selectedAddress = address
        this.addressChartData = getChartData(appData, address)
      }),
      deselectAddress: action(() => {
        this.selectedAddress = null
        this.addressChartData = []
      })
    })
  }
}

const appStore = new AppStore()

export default appStore
