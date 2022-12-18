import React, { useState } from 'react'
import CategoriesButtons from './CategoriesButtons'
import OptionButtons from './OptionButtons'
import ListIngredients from './ListIngredients'

const Categories = ({
  categories,
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
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <OptionButtons options={options} activeOption={activeOption} handler={setActiveOption} />
      </div>
      <ListIngredients
        ingredients={ingredients}
        categories={categories}
        activeCategory={activeCategory}
        handleOnChange={handleOnChange}
        checkedState={checkedState}
      />
    </div>
  )
}

export default Categories
