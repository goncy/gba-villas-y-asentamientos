import React from 'react'

import GoogleMapReact from 'google-map-react'
import compose from 'recompose/compose'
import defaultProps from 'recompose/defaultProps'
import withPropsOnChange from 'recompose/withPropsOnChange'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import pure from 'recompose/pure'

import {MAP_CENTER, DEFAULT_ZOOM, DEFAULT_STYLE} from '../../constants'

export const AppMap = ({center, zoom, style, onGoogleApiLoaded}) => (
  <GoogleMapReact
    center={center}
    zoom={zoom}
    style={style}
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
            fillColor: 'palegreen',
            strokeColor: 'green',
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
        const bounds = new library.LatLngBounds()
        selected.coordinates
          .map(bound => {
            bounds.extend(bound)
          })
        map.fitBounds(bounds)
      }
    }
  ),
  pure
)

export default AppMapHOC(AppMap)
