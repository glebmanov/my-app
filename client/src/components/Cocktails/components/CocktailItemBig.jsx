import React from 'react'
import { Link } from 'react-router-dom'

const CocktailItemBig = ({ id, name, img }) => {
  return (
    <Link to={`${id}`}>
      <div className='item-b'>
        <img src={img} alt='cocktail-img' />
        <div className='description'>
          <p>tasty</p>
          <h3>{name}</h3>
        </div>
      </div>
    </Link>
  )
}

export default CocktailItemBig
