import React, { useEffect } from 'react'
import ListCocktails from '../components/ListCocktails'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { findOrCreateCocktail, clearFavoriteCocktails } from 'store/cocktailsSlice'
import { getFavoriteCocktails } from 'store/userSlice'

const Favorites: React.FC = () => {
  const dispatch = useAppDispatch()
  const favoriteCocktailsId = useAppSelector(state => state.user.favoriteCocktails)
  const cocktails = useAppSelector(state => state.cocktails.favoriteCocktails)

  useEffect(() => {
    favoriteCocktailsId.length && dispatch(getFavoriteCocktails())
    favoriteCocktailsId.length && dispatch(findOrCreateCocktail({ cocktails: favoriteCocktailsId }))
    document.title = 'Cocktails | Favorite cocktails'

    return () => {
      !!cocktails.rows.length && dispatch(clearFavoriteCocktails())
    }
  }, [])

  return (
    <>
      <h1>Your favorites and own cocktails</h1>
      {!!cocktails?.rows?.length && <ListCocktails cocktails={cocktails} showSizeButtons={false} />}
    </>
  )
}

export default Favorites
