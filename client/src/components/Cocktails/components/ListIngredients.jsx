import React from 'react'
import Checkbox from './Checkbox.jsx'

import { uniqueId } from 'lodash'

const ListIngredients = ({ ingredientList, categories, activeCategory, handleOnChange, checkedState }) => {
  const renderSelectedCategory = () =>
    categories[activeCategory].map(ingredientId => {
      const foundIngredient = ingredientList.find(ingredient => ingredient.id === ingredientId)
      const index = ingredientList.indexOf(foundIngredient)
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
    ingredientList.map((ingredient, index) => (
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
