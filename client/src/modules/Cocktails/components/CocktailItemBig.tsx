import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useFavoriteCocktail } from 'hooks/index'

import Favorite from 'static/favorite.svg'

interface CocktailItemBigProps {
  id: number
  name: string
  img: string
  category: number
}

const CocktailItemBig: React.FC<CocktailItemBigProps> = ({ id, name, img, category }) => {
  const { isFavorite, setFavorite } = useFavoriteCocktail(id)
  const navigate = useNavigate()
  const { isAuth } = useAppSelector(state => state.user)
  const cocktailCategories = useAppSelector(state => state.cocktails.cocktailCategories)

  return (
    <div className='item-b' onClick={() => navigate(`/cocktails/${id}`)}>
      <img src={`/${img}`} alt='cocktail-img' />
      <div className='description'>
        <p>{cocktailCategories.find(({ id }) => id === category)?.name || ''}</p>
        <h3>{name}</h3>
      </div>
      {isAuth && (
        <Favorite className={isFavorite ? 'favorite active' : 'favorite'} onClick={(e: Event) => setFavorite(e)} />
      )}
    </div>
  )
}

export default CocktailItemBig
