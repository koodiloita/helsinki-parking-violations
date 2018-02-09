import React from 'react'
import * as _ from 'lodash'
import { getMonthTitle, getMonthShortHand } from '../utils/formatter'
import classNames from 'classnames'

import { observer } from 'mobx-react'
import './DatePanel.css'

const DatePanel = observer(({ appStore }) =>
  <div className="DatePanel">
    {
      _.map(appStore.monthSelections[appStore.selectedYear], (selection) => {
        const panelItemClassNames = classNames({
          PanelItem: true,
          Selected: appStore.selectedMonth === selection.month,
          Disabled: !selection.selectable
        })
        const selectMonth = () => selection.selectable ? appStore.setDate(appStore.selectedYear, selection.month) : null
        return (
          <div className={panelItemClassNames} onClick={selectMonth} key={selection.month}>
            <div className="Long">{getMonthTitle(selection.month)}</div>
            <div className="ShortHand">{getMonthShortHand(selection.month)}</div>
            <div className="Number">{selection.month}</div>
          </div>
        )
      })
    }
  </div>
)

export default DatePanel
