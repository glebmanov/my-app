import React from 'react'
import cocktail from '../../../public/cocktail.svg'
import { uniqueId } from 'lodash'

const CocktailItemMedium = ({ name, ingredients, ingredientList, amount }) => {
  const openModal = () => {}

  return (
    <div className='item-m' onClick={() => openModal()}>
      <img src={cocktail} alt='cocktail-img' />
      <div className='description'>
        <h3>{name}</h3>
        <ul>
          {ingredients.map(ingredientId => (
            <li key={uniqueId()}>
              {ingredientList.find(ingredient => ingredient.id === ingredientId).name} —{' '}
              {amount.find(item => item.ingredientId === ingredientId).value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CocktailItemMedium
