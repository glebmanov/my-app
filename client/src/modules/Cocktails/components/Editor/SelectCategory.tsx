import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CocktailCategory, IngredientCategory } from 'types/cocktailsInterfaces'

interface SelectCategoryProps {
  categories: Array<IngredientCategory | CocktailCategory>
  keyProp: string
}

const SelectCategory: React.FC<SelectCategoryProps> = ({ categories, keyProp }) => {
  const { register } = useFormContext()

  return (
    <label>
      <span>Category</span>
      <select {...register(keyProp)}>
        {categories.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default SelectCategory
