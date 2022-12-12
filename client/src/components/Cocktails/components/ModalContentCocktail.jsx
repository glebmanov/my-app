import React from 'react'

const ModalContentCocktail = ({ cocktail, ingredients }) => {
  const { name, amount } = cocktail

  return (
    <div className='modal-cocktail'>
      <div className='description'>
        <h3>{name}</h3>
        <ul>
          {amount &&
            amount.map(({ id, value, unit, ingredientId }) => {
              const ingredient = ingredients.find(ingredient => ingredient.id === ingredientId)
              return <li key={id}>{`${ingredient.name} - ${value} ${unit}`}</li>
            })}
        </ul>
      </div>
    </div>
  )
}

export default ModalContentCocktail
