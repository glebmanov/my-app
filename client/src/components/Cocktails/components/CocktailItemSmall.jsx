import React from 'react'
import { useDispatch } from 'react-redux'
import { getOneCocktail } from 'store/cocktailsSlice'

const CocktailItemSmall = ({ id, name }) => {
  const dispatch = useDispatch()

  return (
    <div className='item-s' onClick={() => dispatch(getOneCocktail({ id }))}>
      <div className='description'>
        <p>tasty</p>
        <h2>{name}</h2>
      </div>
    </div>
  )
}

export default CocktailItemSmall
