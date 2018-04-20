import React, { Component } from 'react'
import * as _ from 'lodash'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import classNames from 'classnames'
import { observer } from 'mobx-react'

import { getMonthTitle, getMonthShortHand } from '../utils/formatter'
import { getAvailableDates } from '../utils/wrangler'
import './DatePanel.css'

const DatePanel = observer(class DatePanel extends Component {
  render() {
    const loading = _.get(this.props, 'violationCounts.loading', null)
    const error = _.get(this.props, 'violationCounts.error', null)
    const violationCounts = _.get(this.props, 'violationCounts.violationCounts', [])

    if (loading) {
      return <div>Loading</div>
    }

    if (error) {
      return <div>Error</div>
    }

    const monthSelections = getAvailableDates(this.props.violationCounts.violationCounts)

    return (
      <div className="DatePanel">
        <h1>{this.props.appStore.displayYear}</h1>
        <div className="Dates">
        <div onClick={() => choosePreviousYear(this.props.appStore)} className={previousYearSelectionClassNames(this.props.appStore)}>
          <div className="ChangeYearText">{this.props.appStore.displayPreviousYear}</div>
          <div className="Arrow ArrowLeft"></div>
        </div>
          {
            _.map(monthSelections[this.props.appStore.displayYear], (selection) => {
              const panelItemClassNames = classNames({
                PanelItem: true,
                Hovered: this.props.appStore.hoveredMonth === selection.month && this.props.appStore.hoveredYear === selection.year,
                Selected: this.props.appStore.selectedMonth === selection.month && this.props.appStore.selectedYear === selection.year,
                Disabled: !selection.selectable
              })
              const selectMonth = () => selection.selectable ? this.props.appStore.setDate(selection.year, selection.month) : null
              return (
                <div className={panelItemClassNames} onClick={selectMonth} key={selection.month}
                  onMouseEnter={() => this.props.appStore.hoverDate(selection.year, selection.month)} onMouseLeave={this.props.appStore.unhoverDate}>
                  <div className="Long">{getMonthTitle(selection.month)}</div>
                  <div className="ShortHand">{getMonthShortHand(selection.month)}</div>
                  <div className="Number">{selection.month}</div>
                </div>
              )
            })
          }
          <div onClick={() => chooseNextYear(this.props.appStore)} className={nextYearSelectionClassNames(this.props.appStore)}>
          <div className="ChangeYearText">{this.props.appStore.displayNextYear}</div>
            <div className="Arrow ArrowRight"></div>
          </div>
        </div>
      </div>
    )
  }
})

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

const VIOLATION_COUNTS_QUERY = gql`
  query ViolationCountsQuery {
    violationCounts {
      count
      year
      month
    }
  }
`

export default graphql(VIOLATION_COUNTS_QUERY, {
  name: 'violationCounts'
})(DatePanel)
