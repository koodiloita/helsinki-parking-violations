import React from 'react'
import * as _ from 'lodash'
import { observer } from 'mobx-react'
import { scaleLinear, scaleTime } from 'd3-scale'
import { line } from 'd3-shape'
import classNames from 'classnames'
import * as moment from 'moment'

import './LineChart.css'

const graphHeight = 500
const graphWidth = 820
const padding = 50
const axisPadding = padding / 2
const textOffset = 12
const circleRadius = 3
const selectedCircleRadius = 5
const yAxisValuesCount = 5
const xAxisValuesCount = 8

const LineChart = observer(({ appStore }) => {
  const chartData = appStore.addressChartData
  const maxValue = _.maxBy(chartData, 'value').value
  const maxDate = _.maxBy(chartData, 'date').date
  const minDate = _.minBy(chartData, 'date').date

  const yScale = scaleLinear()
    .domain([0, maxValue])
    .range([graphHeight - 2*padding, 0])

  const xScale = scaleTime()
    .domain([minDate, maxDate])
    .range([0, graphWidth - 2*padding])

  const trendLine = line()
    .x((datum) => xScale(datum.date))
    .y((datum) => yScale(datum.value))

  const xAxisValues = xScale.ticks(xAxisValuesCount)
  const yAxisValues = yScale.ticks(yAxisValuesCount)

  const isSelectedDate = (datum) => datum.date.getFullYear() === _.parseInt(appStore.selectedYear) && datum.date.getMonth() === _.parseInt(appStore.selectedMonth) - 1

  return (
    <div className="LineChart">
      <svg width={graphWidth} height={graphHeight} className="ChartSvg">
        <g className="Lines" transform={`translate(${padding}, ${padding})`}>
          <path d={trendLine(chartData)} className="ChartPath" />
        </g>
        <g className="Circles" transform={`translate(${padding}, ${padding})`}>
          {
            _.map(chartData, (datum, index) => {
              const isSelected = isSelectedDate(datum)
              const circleClasses = classNames({
                ChartCircle: true,
                Selected: isSelected
              })
              const radius = isSelected ? selectedCircleRadius : circleRadius
              return (
                <circle key={index} className={circleClasses} r={radius} cx={xScale(datum.date)} cy={yScale(datum.value)} />
              )
            })
          }
        </g>
        <g className="Values" transform={`translate(${padding}, ${padding})`}>
          {
            _.map(chartData, (datum, index) => {
              const isSelected = isSelectedDate(datum)
              const textClasses = classNames({
                CircleValue: true,
                Selected: isSelected
              })
              return (
                <text key={index} className={textClasses} x={xScale(datum.date)} y={yScale(datum.value) - textOffset}>{datum.value}</text>
              )
            })
          }
        </g>
        <g className="XAxisLine">
          <line x1={axisPadding} y1={graphHeight - axisPadding}
                x2={graphWidth - axisPadding} y2={graphHeight - axisPadding}
                className="AxisLine" />
        </g>
        <g className="XAxisValues" transform={`translate(${padding}, 0)`}>
          {
            _.map(xAxisValues, (value, index) => {
              const format = value.getMonth() + 1 === 1 ? 'M/YYYY' : 'M'
              return (
                <text key={index} x={xScale(value)} y={graphHeight - axisPadding + textOffset} className="AxisText">{moment(value).format(format)}</text>
              )
            })
          }
        </g>
        <g className="YAxisLine">
          <text className="AxisLegend" x={axisPadding - textOffset} y={axisPadding - textOffset}>Pysäköintivirheiden lukumäärä</text>
          <line x1={axisPadding} y1={axisPadding}
                x2={axisPadding} y2={graphHeight - axisPadding}
                className="AxisLine" />
        </g>
        <g className="YAxisValues" transform={`translate(0, ${padding})`}>
          {
            _.map(yAxisValues, (value, index) => {
              return (
                <text key={index} y={yScale(value)} x={axisPadding - textOffset} className="AxisText">{value}</text>
              )
            })
          }
        </g>
      </svg>
    </div>
  )
})

export default LineChart
