import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteCocktail, deleteFavoriteCocktail } from 'store/userSlice'

import Favorite from 'static/favorite.svg'

const CocktailItemSmall = ({ id, name }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuth = useSelector(state => state.user.isAuth)
  const favoriteCocktails = useSelector(state => state.user.favoriteCocktails)
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
    <div className='item-s' onClick={() => navigate(`/cocktails/${id}`)}>
      <div className='description'>
        <p>tasty</p>
        <h2>{name}</h2>
      </div>
      {isAuth && <Favorite className={isFavorite ? 'favorite active' : 'favorite'} onClick={e => handlerFavorite(e)} />}
    </div>
  )
}

export default CocktailItemSmall
