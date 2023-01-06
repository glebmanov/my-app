import React, { useEffect } from 'react'
import EditorCocktail from '../components/Editor/EditorCocktail'
import EditorIngredient from '../components/Editor/EditorIngredient'

const EditorPage = ({ ingredients, categories }) => {
  useEffect(() => {
    document.title = 'Cocktails | Editor cocktails'
  }, [])

  return (
    <>
      <h1>Create your cocktail</h1>
      <div className='wrapper-editor'>
        <div className='content-editor'>
          <EditorCocktail ingredients={ingredients} />
          <EditorIngredient categories={categories} />
        </div>
      </div>
    </>
  )
}

export default EditorPage
