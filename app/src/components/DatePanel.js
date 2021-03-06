import React from 'react'
import * as _ from 'lodash'
import { getMonthTitle, getMonthShortHand } from '../utils/formatter'
import classNames from 'classnames'

import { observer } from 'mobx-react'
import './DatePanel.css'

const DatePanel = observer(({ appStore }) =>
  <div className="DatePanel">
    <h1>{appStore.displayYear}</h1>
    <div className="Dates">
    <div onClick={() => choosePreviousYear(appStore)} className={previousYearSelectionClassNames(appStore)}>
      <div className="ChangeYearText">{appStore.displayPreviousYear}</div>
      <div className="Arrow ArrowLeft"></div>
    </div>
      {
        _.map(appStore.monthSelections[appStore.displayYear], (selection) => {
          const panelItemClassNames = classNames({
            PanelItem: true,
            Hovered: appStore.hoveredMonth === selection.month && appStore.hoveredYear === selection.year,
            Selected: appStore.selectedMonth === selection.month && appStore.selectedYear === selection.year,
            Disabled: !selection.selectable
          })
          const selectMonth = () => selection.selectable ? appStore.setDate(selection.year, selection.month) : null
          return (
            <div className={panelItemClassNames} onClick={selectMonth} key={selection.month}
              onMouseEnter={() => appStore.hoverDate(selection.year, selection.month)} onMouseLeave={appStore.unhoverDate}>
              <div className="Long">{getMonthTitle(selection.month)}</div>
              <div className="ShortHand">{getMonthShortHand(selection.month)}</div>
              <div className="Number">{selection.month}</div>
            </div>
          )
        })
      }
      <div onClick={() => chooseNextYear(appStore)} className={nextYearSelectionClassNames(appStore)}>
      <div className="ChangeYearText">{appStore.displayNextYear}</div>
        <div className="Arrow ArrowRight"></div>
      </div>
    </div>
  </div>
)

const chooseNextYear = (appStore) => {
  if (appStore.nextYearActive) {
    appStore.chooseNextYear()
  }
}

const choosePreviousYear = (appStore) => {
  if (appStore.previousYearActive) {
    appStore.choosePreviousYear()
  }
}

const previousYearSelectionClassNames = (appStore) => {
  return classNames({
    ChangeYear: true,
    Disabled: !appStore.previousYearActive
  })
}

const nextYearSelectionClassNames = (appStore) => {
  return classNames({
    ChangeYear: true,
    Disabled: !appStore.nextYearActive
  })
}

export default DatePanel
