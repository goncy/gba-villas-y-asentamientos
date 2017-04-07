import React from 'react'

import GoogleMapReact from 'google-map-react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import pure from 'recompose/pure'

import {MAP_CENTER, DEFAULT_ZOOM, DEFAULT_STYLE, GET_MAP_OPTIONS} from '../../constants'

export const AppMap = ({center, zoom, style, onGoogleApiLoaded}) => (
  <GoogleMapReact
    center={center}
    zoom={zoom}
    style={style}
    options={GET_MAP_OPTIONS}
    yesIWantToUseGoogleMapApiInternals={true}
    onGoogleApiLoaded={onGoogleApiLoaded}
  />
)

export const AppMapHOC = compose(
  defaultProps({
    center: MAP_CENTER,
    style: DEFAULT_STYLE,
    zoom: DEFAULT_ZOOM
  }),
  withState(
    'library',
    'setLibrary',
    null
  ),
  withState(
    'map',
    'setMap',
    null
  ),
  withState(
    'polygon',
    'setPolygon',
    null
  ),
  withState(
    'allPolygons',
    'setAllPolygons',
    null
  ),
  withHandlers({
    onGoogleApiLoaded: ({setLibrary, setMap}) => ({map, maps}) => {
      setLibrary(maps)
      setMap(map)
    }
  }),
  withPropsOnChange(
    ['selected'],
    ({map, library, selected, setPolygon, polygon}) => {
      if (library) {
        if (polygon) {
          polygon.setPath(selected.coordinates)
        } else {
          setPolygon(new library.Polygon({
            paths: selected.coordinates,
            fillColor: 'greenyellow',
            strokeColor: 'yellow',
            zIndex: 999,
            map
          }))
        }
      }
    }
  ),
  withPropsOnChange(
    ['selected'],
    ({map, library, selected}) => {
      if (library) {
        centerPolygon(library, map, selected)
      }
    }
  ),
  withPropsOnChange(
    ['showAll'],
    ({map, library, data: {items}, showAll, allPolygons, setAllPolygons, setSelected}) => {
      if (library) {
        if (showAll) {
          const polygons = []
          const bounds = new library.LatLngBounds()
          items.map(item => {
            const polygon = new library.Polygon({
              paths: item.coordinates,
              fillColor: 'palegreen',
              strokeColor: 'green',
              map
            })
            library.event.addListener(polygon, 'click', () => {
              setSelected(item)
            })
            polygons.push(polygon)
            centerPolygon(library, map, item, bounds)
            setAllPolygons(polygons)
          })
        } else {
          allPolygons.map(polygon => {
            library.event.clearListeners(polygon, 'click')
            polygon.setMap(null)
          })
        }
      }
    }
  ),
    withPropsOnChange(
    ['showAll'],
    ({map, library, selected, showAll}) => {
      if (library) {
        if (!showAll) {
          centerPolygon(library, map, selected)
        }
      }
    }
  ),
  pure
)

const centerPolygon = (library, map, polygon, _bounds) => {
  if (!polygon) return
  const bounds = _bounds || new library.LatLngBounds()
  polygon.coordinates
    .map(bound => {
      bounds.extend(bound)
    })
  map.fitBounds(bounds)
}

export default AppMapHOC(AppMap)
