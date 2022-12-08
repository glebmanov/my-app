import React from 'react'
import EditorCocktail from './EditorCocktail'
import EditorIngredient from './EditorIngredient'
import data from '../../cocktailList'

const Add = () => {
  return (
    <div className='wrapper-editor'>
      <div className='content-editor'>
        <EditorCocktail ingredients={data.ingredients} />
        <EditorIngredient categories={Object.keys(data.categories)} />
      </div>
    </div>
  )
}

export default Add
