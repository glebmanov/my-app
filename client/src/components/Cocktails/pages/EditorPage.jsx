import React from 'react'
import { useSelector } from 'react-redux'
import EditorCocktail from '../components/Editor/EditorCocktail'
import EditorIngredient from '../components/Editor/EditorIngredient'

const EditorPage = ({ ingredients }) => {
  document.title = 'Cocktails | Editor cocktails'

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

export default EditorPage
