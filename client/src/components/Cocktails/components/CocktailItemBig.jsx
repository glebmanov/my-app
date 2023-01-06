import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteCocktail, deleteFavoriteCocktail } from 'store/userSlice'

import Favorite from 'static/favorite.svg'

const CocktailItemBig = ({ id, name, img }) => {
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

  useEffect(() => isAuth && setIsFavorite(favoriteCocktails.includes(id)), [favoriteCocktails])

  return (
    <div className='item-b' onClick={() => navigate(`/cocktails/${id}`)}>
      <img src={img} alt='cocktail-img' />
      <div className='description'>
        <p>tasty</p>
        <h3>{name}</h3>
      </div>
      {isAuth && <Favorite className={isFavorite ? 'favorite active' : 'favorite'} onClick={e => handlerFavorite(e)} />}
    </div>
  )
}

export default CocktailItemBig
