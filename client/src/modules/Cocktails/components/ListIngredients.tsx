import React from 'react'
import { uniqueId } from 'lodash'
import Checkbox from './Checkbox'
import { Ingredient, IngredientCategory } from 'types/cocktailsInterfaces'

interface ListIngredientsProps {
  ingredients: Array<Ingredient>
  ingredientCategories: Array<IngredientCategory>
  activeCategory: string
  handleOnChange: (position: number, ingredient: Ingredient) => void
  checkedState: Array<boolean>
}

const ListIngredients: React.FC<ListIngredientsProps> = ({
  ingredients,
  ingredientCategories,
  activeCategory,
  handleOnChange,
  checkedState,
}) => {
  const renderSelectedCategory = () => {
    const foundIngredientCategory = ingredientCategories.find(
      ({ name }) => activeCategory === name,
    ) as IngredientCategory
    return foundIngredientCategory.ingredients.map(ingredientId => {
      const foundIngredient = ingredients.find(ingredient => ingredient.id === ingredientId) as Ingredient
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
  }

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
    <div className='list-ingredients'>{activeCategory === 'all' ? renderAllCategory() : renderSelectedCategory()}</div>
  )
}

export default ListIngredients
