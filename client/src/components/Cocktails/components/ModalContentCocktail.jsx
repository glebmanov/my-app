import React from 'react'
import { uniqueId } from 'lodash'

const ModalContentCocktail = ({ cocktail, ingredientList }) => {
  const { name, ingredients, amount } = cocktail

  return (
    <div className='modal-cocktail'>
      <div className='description'>
        <h3>{name || ''}</h3>
        <ul>
          {ingredients &&
            ingredients.map(ingredientId => (
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

export default ModalContentCocktail
