import React from 'react'
import compose from 'recompose/compose'
import withState from 'recompose/withState'

import {filterItemsByName} from '../../selectors'

import './Sidebar.css'

export const Sidebar = ({data: {items}, setSelected, selected, search, setSearch}) => (
  <div className='Sidebar'>
    <input
      className='search'
      onChange={({target: {value}}) => setSearch(value)}
      type="text"
    />
    <ul>
      {filterItemsByName(search, items)
        .map(({original: result}, index) => (
          <li
            key={index}
            onClick={() => setSelected(result)}
            className={result === selected ? 'selected' : ''}
          >
            <span className="title">
              {result.name}
            </span>
            <br/>
            <span className="subtitle">
              {result.region} - {result.city}
            </span>
          </li>
        ))
      }
    </ul>
  </div>
)

export const SidebarHOC = compose(
  withState(
    'search',
    'setSearch',
    ''
  )
)

export default SidebarHOC(Sidebar)
