import { extendObservable, action, computed } from 'mobx'
import { getMonthSelections, getLastYear, getGeoJsonData } from '../utils/wrangler'
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
        this.geoJsonData = getGeoJsonData(year, month, appData)
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
      })
    })
  }
}

const appStore = new AppStore()

export default appStore
