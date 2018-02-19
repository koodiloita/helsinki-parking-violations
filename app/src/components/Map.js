import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import { observer } from 'mobx-react'
import { extendObservable, computed } from 'mobx'
import * as _ from 'lodash'

import './Map.css'
import config from '../config'

mapboxgl.accessToken = config.mapBoxToken

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
    window.map = map
    setLayers(map, this.mapData, this.props.appStore.selectAddress)
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

const setLayers = (map, data, selectAddress) => {
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
            [50, 1]
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
            [14, 20]
          ]
        },
        'heatmap-opacity': {
          default: 1,
          stops: [
            [14, 1],
            [17, 0]
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
          property: 'value',
          type: 'exponential',
          stops: [
            [1, 5],
            [10, 7],
            [20, 10],
            [40, 15],
            [60, 20],
            [80, 25],
            [100, 30],
            [150, 40],
            [200, 50]
          ]
        },
        'circle-stroke-color': {
          property: 'value',
          type: 'exponential',
          stops: [
            [5, 'rgba(255, 255, 255, 0.3)'],
            [10, 'rgba(255, 255, 255, 0.5)'],
            [11, 'rgba(255, 255, 255, 0.7)'],
            [30, 'rgba(255, 255, 255, 1)']
          ]
        },
        'circle-color': 'rgba(0, 0, 0, 0.5)',
        'circle-stroke-width': 1,
        'circle-opacity': {
          stops: [
            [14, 0],
            [15, 0.5]
          ]
        }
      }
    }, 'waterway-label')
  })

  map.on('click', 'parkingViolationsPoint', (e) => {
    const address = _.get(e, 'features[0].properties.address', '')
    selectAddress(address)
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
