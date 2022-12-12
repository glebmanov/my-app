import React from 'react'
import EditorCocktail from './EditorCocktail'
import EditorIngredient from './EditorIngredient'
import { useSelector } from 'react-redux'

const Add = ({ ingredients }) => {
  const categories = useSelector(state => state.cocktails.categories)

  return (
    <div className='wrapper-editor'>
      <div className='content-editor'>
        <EditorCocktail ingredients={ingredients} />
        <EditorIngredient categories={categories} />
      </div>
    </div>
  )
}

export default Add
