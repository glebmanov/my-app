import React, { useState } from 'react'
import CategoriesButtons from './CategoriesButtons'
import OptionButtons from './OptionButtons'
import ListIngredients from './ListIngredients'

const Categories = ({
  ingredientCategories,
  ingredients,
  handleOnChange,
  checkedState,
  options,
  activeOption,
  setActiveOption,
}) => {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className='categories'>
      <div className='buttons'>
        <CategoriesButtons
          ingredientCategories={ingredientCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <OptionButtons options={options} activeOption={activeOption} handler={setActiveOption} />
      </div>
      <ListIngredients
        ingredients={ingredients}
        ingredientCategories={ingredientCategories}
        activeCategory={activeCategory}
        handleOnChange={handleOnChange}
        checkedState={checkedState}
      />
    </div>
  )
}

export default Categories
