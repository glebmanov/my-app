import React from 'react'

const Checkbox = ({ ingredient, handleOnChange, index, checkedState }) => {
  return (
    <div className='ingredient'>
      <input
        type='checkbox'
        id={ingredient.id}
        checked={checkedState[index]}
        onChange={() => handleOnChange(index, ingredient)}
      />
      <label htmlFor={ingredient.id}>{ingredient.name}</label>
    </div>
  )
}

export default Checkbox
