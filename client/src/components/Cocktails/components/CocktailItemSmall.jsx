import React from 'react'

const CocktailItemSmall = ({ name, category = 'tasty', openModal, cocktail }) => {
  return (
    <div className='item-s' onClick={() => openModal(cocktail)}>
      <div className='description'>
        <p>{category}</p>
        <h2>{name}</h2>
      </div>
    </div>
  )
}

export default CocktailItemSmall
