import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCocktails } from 'store/cocktailsSlice'
import ListCocktails from '../components/ListCocktails'

const CocktailsPage = () => {
  const dispatch = useDispatch()
  const cocktails = useSelector(state => state.cocktails.cocktails)

  useEffect(() => {
    dispatch(getCocktails({}))
    document.title = 'Cocktails | List cocktails'
  }, [])

  return (
    <>
      <h1>Search cocktails</h1>
      {!!cocktails.rows?.length && <ListCocktails cocktails={cocktails} />}
    </>
  )
}

export default CocktailsPage
