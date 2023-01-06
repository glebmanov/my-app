import React, { useEffect } from 'react'
import ListCocktails from '../components/ListCocktails'

const CocktailsPage = ({ cocktails }) => {
  useEffect(() => {
    document.title = 'Cocktails | List cocktails'
  }, [])

  return (
    <>
      <h1>Search cocktails</h1>
      {cocktails.rows?.length && <ListCocktails cocktails={cocktails} />}
    </>
  )
}

export default CocktailsPage
