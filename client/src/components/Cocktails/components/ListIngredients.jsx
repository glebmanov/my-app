import React from 'react'
import Checkbox from './Checkbox'

import { uniqueId } from 'lodash'

const ListIngredients = ({ ingredients, categories, activeCategory, handleOnChange, checkedState }) => {
  const renderSelectedCategory = () =>
    categories
      .find(({ id }) => activeCategory === id)
      .ingredients.map(ingredientId => {
        const foundIngredient = ingredients.find(ingredient => ingredient.id === ingredientId)
        const index = ingredients.indexOf(foundIngredient)
        return (
          <Checkbox
            ingredient={foundIngredient}
            handleOnChange={handleOnChange}
            index={index}
            checkedState={checkedState}
            key={uniqueId()}
          />
        )
      })

  const renderAllCategory = () =>
    ingredients.map((ingredient, index) => (
      <Checkbox
        ingredient={ingredient}
        handleOnChange={handleOnChange}
        index={index}
        checkedState={checkedState}
        key={uniqueId()}
      />
    ))

  return (
    <div className='list-ingredients'>
      {activeCategory === 'all' ? renderAllCategory() : renderSelectedCategory(activeCategory)}
    </div>
  )
}

export default ListIngredients
