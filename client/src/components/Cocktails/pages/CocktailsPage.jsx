import React from 'react'
import ListCocktails from '../components/ListCocktails'

const CocktailsPage = ({ cocktails }) => {
  document.title = 'Cocktails | List cocktails'

  return (
    <>
      <h1>List cocktails</h1>
      {cocktails.rows?.length && <ListCocktails cocktails={cocktails} />}
    </>
  )
}

export default CocktailsPage
