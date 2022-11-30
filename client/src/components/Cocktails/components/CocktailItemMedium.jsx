import React from 'react'
import cocktailSvg from '../../../../public/cocktail.svg'
import { uniqueId } from 'lodash'

const CocktailItemMedium = ({ cocktail, ingredientList, openModal }) => {
  return (
    <div className='item-m' onClick={() => openModal(cocktail)}>
      <img src={cocktailSvg} alt='cocktail-img' />
      <div className='description'>
        <h3>{cocktail.name}</h3>
        <ul>
          {cocktail.ingredients.map(ingredientId => (
            <li key={uniqueId()}>
              {ingredientList.find(ingredient => ingredient.id === ingredientId).name} —{' '}
              {cocktail.amount.find(item => item.ingredientId === ingredientId).value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default CocktailItemMedium
