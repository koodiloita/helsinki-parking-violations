import React from 'react'
import { observer } from 'mobx-react'

import './ChartDialog.css'
import LineChart from './LineChart'

const ChartDialog = observer(({ appStore }) => {
  if (!appStore.selectedAddress) {
    return null
  }

  return (
    <div className="ChartDialog">
      <div onClick={appStore.deselectAddress} className="ClosePanel">
        <div className="CloseButton">Sulje <div className="CloseIcon">x</div></div>
      </div>
      <h1 className="ChartHeader">{appStore.selectedAddress}</h1>
      <LineChart appStore={ appStore } />
    </div>
  )
})



export default ChartDialog
