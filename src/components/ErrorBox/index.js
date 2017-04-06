import React from 'react'

import './ErrorBox.css'

const ErrorBox = ({error}) => (
  <div className='ErrorBox'>
    <p>{error}</p>
  </div>
)

export default ErrorBox
