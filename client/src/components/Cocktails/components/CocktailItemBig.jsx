import React from 'react'
import cocktailSvg from '../../../../public/cocktail.svg'

const CocktailItemBig = ({ name, category = 'tasty', openModal, cocktail }) => {
  return (
    <div className='item-b' onClick={() => openModal(cocktail)}>
      <img src={cocktailSvg} alt='cocktail-img' />
      <div className='description'>
        <p>{category}</p>
        <h3>{name}</h3>
      </div>
    </div>
  )
}

export default CocktailItemBig
