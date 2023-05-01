import React from 'react'
import { Ingredient } from 'types/cocktailsInterfaces'

interface CheckboxProps {
  ingredient: Ingredient
  handleOnChange: (position: number, ingredient: Ingredient) => void
  index: number
  checkedState: Array<boolean>
}

const Checkbox: React.FC<CheckboxProps> = ({ ingredient, handleOnChange, index, checkedState }) => {
  return (
    <div className='ingredient'>
      <input
        type='checkbox'
        id={ingredient.id.toString()}
        checked={checkedState[index]}
        onChange={() => handleOnChange(index, ingredient)}
      />
      <label htmlFor={ingredient.id.toString()}>{ingredient.name}</label>
    </div>
  )
}

export default Checkbox
