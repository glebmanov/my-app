import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { addFavoriteCocktail, deleteFavoriteCocktail } from 'store/userSlice'

import Favorite from 'static/favorite.svg'

interface CocktailItemBigProps {
  id: number
  name: string
  img: string
  category: number
}

const CocktailItemBig: React.FC<CocktailItemBigProps> = ({ id, name, img, category }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAppSelector(state => state.user.isAuth)
  const favoriteCocktails = useAppSelector(state => state.user.favoriteCocktails)
  const cocktailCategories = useAppSelector(state => state.cocktails.cocktailCategories)
  const [isFavorite, setIsFavorite] = useState(false)

  const handlerFavorite = e => {
    e.stopPropagation()
    isFavorite
      ? dispatch(deleteFavoriteCocktail({ cocktailId: id }))
      : dispatch(addFavoriteCocktail({ cocktailId: id }))
    setIsFavorite(prevState => !prevState)
  }

  useEffect(() => {
    isAuth && setIsFavorite(favoriteCocktails.includes(id))
  }, [favoriteCocktails])

  return (
    <div className='item-b' onClick={() => navigate(`/cocktails/${id}`)}>
      <img src={img} alt='cocktail-img' />
      <div className='description'>
        <p>{cocktailCategories.find(({ id }) => id === category)?.name || ''}</p>
        <h3>{name}</h3>
      </div>
      {isAuth && <Favorite className={isFavorite ? 'favorite active' : 'favorite'} onClick={e => handlerFavorite(e)} />}
    </div>
  )
}

export default CocktailItemBig
