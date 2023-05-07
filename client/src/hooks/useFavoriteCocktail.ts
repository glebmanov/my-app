import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './useRedux'
import { addFavoriteCocktail, deleteFavoriteCocktail } from 'store/userSlice'

export const useFavoriteCocktail = (id: number) => {
  const dispatch = useAppDispatch()
  const { isAuth, favoriteCocktails } = useAppSelector(state => state.user)
  const [isFavorite, setIsFavorite] = useState(false)

  const setFavorite: EventListener = e => {
    e.stopPropagation()
    isFavorite
      ? dispatch(deleteFavoriteCocktail({ cocktailId: id }))
      : dispatch(addFavoriteCocktail({ cocktailId: id }))
    setIsFavorite(prevState => !prevState)
  }

  useEffect(() => {
    isAuth && setIsFavorite(favoriteCocktails.includes(id))
  }, [favoriteCocktails])

  return {
    isFavorite,
    setFavorite,
  }
}
