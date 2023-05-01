import React, { useState } from 'react'
import CategoriesButtons from './Buttons/CategoriesButtons'
import OptionButtons from './Buttons/OptionButtons'
import ListIngredients from './ListIngredients'
import { Ingredient, IngredientCategory } from 'types/cocktailsInterfaces'

interface CategoriesProps {
  ingredientCategories: Array<IngredientCategory>
  ingredients: Array<Ingredient>
  handleOnChange: (position: number, ingredient: Ingredient) => void
  checkedState: Array<boolean>
  options: Array<string>
  activeOption: string
  setActiveOption: React.Dispatch<React.SetStateAction<string>>
}

const Categories: React.FC<CategoriesProps> = ({
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
