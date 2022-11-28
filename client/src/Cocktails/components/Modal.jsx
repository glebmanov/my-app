import React from 'react'
import { uniqueId } from 'lodash'

const Modal = ({ active, setActive, cocktail, ingredientList }) => {
  const { name, ingredients, amount } = cocktail

  return (
    <div className={active ? 'my-modal active' : 'my-modal'} onClick={() => setActive(false)}>
      <div className='my-modal-content' onClick={e => e.stopPropagation()}>
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
    </div>
  )
}

export default Modal
