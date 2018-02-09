import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'

import './Map.css'
import config from '../config'

mapboxgl.accessToken = config.mapBoxToken

class Map extends Component {
  render() {
    return (
      <div className="Map" id="map"></div>
    )
  }

  componentDidMount() {
    const map = createMap()
  }
}

const createMap = () => {
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [24.938278, 60.223965],
    zoom: 11
  })
}

export default Map
