import React from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useFavoriteCocktail } from 'hooks/index'
import Favorite from 'static/favorite.svg'

interface CocktailItemSmallProps {
  id: number
  name: string
  category: number
}

const CocktailItemSmall: React.FC<CocktailItemSmallProps> = ({ id, name, category }) => {
  const { isFavorite, setFavorite } = useFavoriteCocktail(id)
  const navigate = useNavigate()
  const { isAuth } = useAppSelector(state => state.user)
  const cocktailCategories = useAppSelector(state => state.cocktails.cocktailCategories)

  return (
    <div className='item-s' onClick={() => navigate(`/cocktails/${id}`)}>
      <div className='description'>
        <p>{cocktailCategories.find(({ id }) => id === category)?.name || ''}</p>
        <h2>{name}</h2>
      </div>
      {isAuth && (
        <Favorite className={clsx('favorite', isFavorite && 'active')} onClick={(e: Event) => setFavorite(e)} />
      )}
    </div>
  )
}

export default CocktailItemSmall
