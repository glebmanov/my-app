import React from 'react'
import { uniqueId } from 'lodash'

const EditorCocktail = ({ ingredients }) => {
  return (
    <div id='editor-cocktail'>
      <h3>Add cocktail</h3>
      <div className='editor-inputs'>
        <label htmlFor='input-cocktail-name'>Name</label>
        <input id='input-cocktail-name' type='text' />

        <label htmlFor='inputs-cocktail-ingredients'>Ingredients</label>
        <div id='inputs-cocktail-ingredients'>
          <div className='cocktail-ingredient'>
            <select>
              {ingredients.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
            <input className='amount-cocktail-ingredient' type='number' />
            <select className='ingredient-units'>
              {['ml', 'dash'].map((unit, index) => (
                <option key={uniqueId()} value={index}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type='button' className='btn btn-cstm ingredient-add'>
          +
        </button>

        <button type='button' className='btn btn-cstm btn-add'>
          Add
        </button>
      </div>
    </div>
  )
}

export default EditorCocktail
