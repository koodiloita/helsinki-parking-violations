import { extendObservable, action } from 'mobx'
import { getMonthSelections, getLastYear, getGeoJsonData } from '../utils/wrangler'
const appData = require('../data/appData.json')

class AppStore {
  constructor() {
    const selectedYear = getLastYear(appData)
    const selectedMonth = '1'
    extendObservable(this, {
      selectedMonth,
      selectedYear,
      setDate: action((year, month) => {
        this.selectedMonth = month
        this.selectedYear = year
        this.geoJsonData = getGeoJsonData(year, month, appData)
      }),
      monthSelections: getMonthSelections(appData),
      geoJsonData: getGeoJsonData(selectedYear, selectedMonth, appData)
    })
  }
}

const appStore = new AppStore()

export default appStore
