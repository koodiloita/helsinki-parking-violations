import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { observer } from 'mobx-react'
import { extendObservable, computed } from 'mobx'
import * as _ from 'lodash'

import './Map.css'

mapboxgl.accessToken = _.get(process.env, 'REACT_APP_MAPBOX_TOKEN', '')

const Map = observer(class Map extends Component {
  constructor(props) {
    super(props)

    extendObservable(this, {
      mapData: computed(() => {
        return this.props.appStore.geoJsonData
      })
    })
  }

  render() {
    if (this.state) {
      updateMapData(this.state.map, this.mapData)
    }
    return (
      <div className="Map" id="map"></div>
    )
  }

  componentDidMount() {
    const map = createMap()
    setLayers(map, this.mapData)
    this.setState({
      map
    })
  }
})

const updateMapData = (map, data) => {
  const source = map.getSource('parkingViolations')
  if (source) {
    source.setData(data)
  }
}

const setLayers = (map, data) => {
  map.on('load', function() {
    map.addSource('parkingViolations', {
      type: 'geojson',
      data: data
    })

    map.addLayer({
      id: 'parkingViolationsHeat',
      type: 'heatmap',
      source: 'parkingViolations',
      maxzoom: 19,
      paint: {
        'heatmap-weight': {
          property: 'value',
          type: 'exponential',
          stops: [
            [1, 0],
            [30, 1]
          ]
        },
        'heatmap-intensity': {
          stops: [
            [11, 1],
            [19, 3]
          ]
        },
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, 'rgba(253, 240, 217, 0)',
          0.2, '#fdcc8a',
          0.4, '#fc8d59',
          0.6, '#e34a33',
          0.8, '#b30000'
        ],
        'heatmap-radius': {
          stops: [
            [11, 10],
            [15, 15]
          ]
        },
        'heatmap-opacity': {
          default: 1,
          stops: [
            [19, 1],
            [20, 0]
          ]
        },
      }
    }, 'waterway-label')

    map.addLayer({
      id: 'parkingViolationsPoint',
      type: 'circle',
      source: 'parkingViolations',
      minzoom: 14,
      paint: {
        'circle-radius': {
          property: 'dbh',
          type: 'exponential',
          stops: [
            [{ zoom: 15, value: 10 }, 3],
            [{ zoom: 15, value: 20 }, 10],
            [{ zoom: 22, value: 10 }, 20],
            [{ zoom: 22, value: 20 }, 50],
          ]
        },
        'circle-color': {
          property: 'dbh',
          type: 'exponential',
          stops: [
            [0, 'rgba(236,222,239,0)'],
            [10, 'rgb(236,222,239)'],
            [20, 'rgb(208,209,230)'],
            [30, 'rgb(166,189,219)'],
            [40, 'rgb(103,169,207)'],
            [50, 'rgb(28,144,153)'],
            [60, 'rgb(1,108,89)']
          ]
        },
        'circle-stroke-color': 'white',
        'circle-stroke-width': 1,
        'circle-opacity': {
          stops: [
            [14, 0],
            [15, 1]
          ]
        }
      }
    }, 'waterway-label')
  })
}

const createMap = () => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [24.938278, 60.223965],
    zoom: 11
  })
  return map
}

export default Map
