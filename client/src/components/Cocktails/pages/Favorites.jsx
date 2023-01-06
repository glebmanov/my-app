import React, { useEffect } from 'react'
import ListCocktails from '../components/ListCocktails'
import { useDispatch, useSelector } from 'react-redux'
import { findOrCreateCocktail } from 'store/cocktailsSlice'

const Favorites = () => {
  const dispatch = useDispatch()
  const favoriteCocktails = useSelector(state => state.user.favoriteCocktails)
  const cocktails = useSelector(state => state.cocktails.favoriteCocktails)

  useEffect(() => {
    dispatch(findOrCreateCocktail({ cocktails: favoriteCocktails }))
    document.title = 'Cocktails | Favorite cocktails'
  }, [dispatch])

  return (
    <>
      <h1>Your favorites and own cocktails</h1>
      {cocktails.rows?.length && <ListCocktails cocktails={cocktails} showSizeButtons={false} />}
    </>
  )
}

export default Favorites
