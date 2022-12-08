import React from 'react'
import { uniqueId } from 'lodash'

const EditorIngredient = ({ categories }) => {
  return (
    <div id='editor-ingredient'>
      <h3>Add ingredient</h3>
      <div className='editor-inputs'>
        <label htmlFor='input-ingredient-name'>Name</label>
        <input id='input-ingredient-name' type='text' />

        <label htmlFor='input-ingredient-category'>Category</label>
        <select id='input-ingredient-category'>
          {categories.map(category => (
            <option key={uniqueId()} value={uniqueId()}>
              {category}
            </option>
          ))}
        </select>

        <button type='button' className='btn btn-cstm btn-add'>
          Add
        </button>
      </div>
    </div>
  )
}

export default EditorIngredient
