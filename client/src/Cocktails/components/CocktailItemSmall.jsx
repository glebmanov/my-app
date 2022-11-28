import React from 'react'

const CocktailItemSmall = ({ name, category = 'tasty' }) => {
  const openModal = () => {}

  return (
    <div className='item-s' onClick={() => openModal()}>
      <div className='description'>
        <p>{category}</p>
        <h2>{name}</h2>
      </div>
    </div>
  )
}

export default CocktailItemSmall
