import React, { Component } from 'react'

import './App.css'
import Map from './components/Map'
import DatePanel from './components/DatePanel'
import appStore from './state/appStore'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="AppHeader">Helsingin pysäköintivirheet</h1>
        <DatePanel appStore={ appStore } />
        <Map appStore={ appStore } />
      </div>
    )
  }
}

export default App
