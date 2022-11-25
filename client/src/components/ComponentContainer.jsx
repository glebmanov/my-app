import React from 'react'

const ComponentContainer = ({ name, description }) => {
  return (
    <div className='component-container'>
      <h3>{name}</h3>
      <div>
        <span>{description}</span>
      </div>
    </div>
  )
}

export default ComponentContainer
