import React from 'react'
import { useDispatch } from 'react-redux'
import { getOneCocktail } from 'store/cocktailsSlice'

const CocktailItemBig = ({ id, name, img }) => {
  const dispatch = useDispatch()

  return (
    <div className='item-b' onClick={() => dispatch(getOneCocktail({ id }))}>
      <img src={img} alt='cocktail-img' />
      <div className='description'>
        <p>tasty</p>
        <h3>{name}</h3>
      </div>
    </div>
  )
}

export default CocktailItemBig
