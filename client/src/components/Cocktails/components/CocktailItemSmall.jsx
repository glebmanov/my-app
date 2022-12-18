import React from 'react'
import { useNavigate } from 'react-router-dom'

const CocktailItemSmall = ({ id, name }) => {
  const navigate = useNavigate()

  return (
    <div className='item-s' onClick={() => navigate(`/cocktails/${id}`)}>
      <div className='description'>
        <p>tasty</p>
        <h2>{name}</h2>
      </div>
    </div>
  )
}

export default CocktailItemSmall
