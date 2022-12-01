import React from 'react'
import ListCocktails from '../components/ListCocktails'

const CocktailsPage = ({ cocktails, ingredientList, openModal }) => {
  document.title = 'Cocktails | List cocktails'

  return (
    <>
      <h1>List cocktails</h1>
      <ListCocktails cocktails={cocktails} ingredientList={ingredientList} openModal={openModal} />
    </>
  )
}

export default CocktailsPage
