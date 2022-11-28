import React from 'react'
import cocktail from '../../../public/cocktail.svg'

const CocktailItemBig = ({ name, category = 'tasty' }) => {
  const openModal = () => {}

  return (
    <div className='item-b' onClick={() => openModal()}>
      <img src={cocktail} alt='cocktail-img' />
      <div className='description'>
        <p>{category}</p>
        <h3>{name}</h3>
      </div>
    </div>
  )
}

export default CocktailItemBig
