import React from 'react'

const Warning = ({ error }) => {
  return (
    <div className='warning d-flex flex-column p-2 p-md-4 rounded'>
      <p className='m-auto'>{error}</p>
    </div>
  )
}

export default Warning
