import React from 'react'
import ListCocktails from '../components/ListCocktails.jsx'

const CocktailsPage = ({ cocktails, ingredientList }) => {
  document.title = 'Cocktails | List cocktails'

  return (
    <>
      <h1>List cocktails</h1>
      <ListCocktails cocktails={cocktails} ingredientList={ingredientList} />
    </>
  )
}

export default CocktailsPage
