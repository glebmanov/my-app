import React from 'react'
import uniqueId from 'lodash/uniqueId'
import Checkbox from './Checkbox'
import { Ingredient, IngredientCategory } from 'types/cocktailsInterfaces'
import { useAppSelector } from 'hooks/useRedux'
import { useIngredientsContext } from '../context'

interface ListIngredientsProps {
  handleOnChange: (position: number, ingredient: Ingredient) => void
  checkedState: Array<boolean>
}

export const ListIngredients: React.FC<ListIngredientsProps> = ({ handleOnChange, checkedState }) => {
  const { ingredients, ingredientCategories } = useAppSelector(state => state.cocktails)
  const { activeCategory } = useIngredientsContext()

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
