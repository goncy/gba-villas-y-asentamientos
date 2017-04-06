import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'
import lifecycle from 'recompose/lifecycle'
import moment from 'moment'

import AppMap from './components/AppMap'
import Sidebar from './components/Sidebar'
import Spinner from './components/Spinner'
import ErrorBox from './components/ErrorBox'

import {RESOURCE_URL} from './constants'
import {shapeResponse} from './selectors'

import mockedData from './mockedData.json'

import './App.css'

moment.locale('es')

export const App = ({data, selected, setSelected, status}) => (
  <div className="App">
    {/* PENDING */}
    {['init', 'pending'].includes(status) && <Spinner />}

    {/* SUCCESS */}
    {status === 'success' && data && (
      <div className='layout'>
        <Sidebar
          selected={selected}
          setSelected={setSelected}
          data={data}
        />
        <div className="mapContainer">
          <AppMap
            selected={selected}
            data={data}
          />
          {selected && (
            <div className='info'>
              <span className="title">{selected.name}</span>
              <div className="subtitle">{selected.region}</div>
              <p className='subtitle'>
                Establecida <b>{moment(selected.stabilished, "YYYY").fromNow()}</b>, es un <b>{selected.type}</b>, con <b>{selected.integrants} integrantes</b>.
                Con una superficie aproximada de <b>{parseFloat(selected.surface)} km</b>. La cobertura de electricidad es <b>{selected.electricity}</b>,
                la de iluminacion publica es <b>{selected.street_electricity}</b>, la de agua <b>{selected.water}</b>, la de cloacas <b>{selected.sewer}</b> y la de gas <b>{selected.gas}</b>.
              </p>
            </div>
          )}
        </div>
      </div>
    )}

    {/* FAILURE */}
    {status === 'failure' && (
      <ErrorBox error='Hubo un error obteniendo los datos, por favor, recargue la pagina o intente nuevamente mas tarde' />
    )}
  </div>
)

export const AppHOC = compose(
  withState(
    'selected',
    'setSelected',
    null
  ),
  withState(
    'data',
    'setData',
    shapeResponse(mockedData)
  ),
  withState(
    'status',
    'setStatus',
    'success'
  ),
  /* lifecycle({
    async componentDidMount () {
      const request = await fetch(RESOURCE_URL)
      const response = await request.json()
      if (response.result) {
        this.props.setStatus('success')
        this.props.setData(shapeResponse(response))
      } else {
        this.props.setStatus('failure')
      }
    }
  }) */
)

export default AppHOC(App)
