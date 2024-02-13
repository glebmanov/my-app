import React, { useEffect } from 'react'
import { ListCocktails } from '../components/ListCocktails'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { clearFavoriteCocktails, getCocktails } from 'store/cocktailsSlice'
import { getFavoriteCocktails } from 'store/userSlice'

const FavoritesPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const favoriteCocktails = useAppSelector(state => state.user.favoriteCocktails)
  const cocktails = useAppSelector(state => state.cocktails.favoriteCocktails)

  useEffect(() => {
    favoriteCocktails.length && dispatch(getFavoriteCocktails())
    favoriteCocktails.length && dispatch(getCocktails({ cocktails: favoriteCocktails }))
    document.title = 'Cocktails | Favorite cocktails'

    return () => {
      !!cocktails.rows.length && dispatch(clearFavoriteCocktails())
    }
  }, [])

  return (
    <>
      <h1>Your favorites cocktails</h1>
      {!!cocktails?.rows?.length && <ListCocktails cocktails={cocktails} showSizeButtons={false} />}
    </>
  )
}

export default FavoritesPage
