import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneCocktail } from 'store/cocktailsSlice'

const CocktailPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const cocktail = useSelector(state => state.cocktails.cocktail)
  const ingredients = useSelector(state => state.cocktails.ingredients)

  useEffect(() => {
    dispatch(getOneCocktail({ id }))
    document.title = `Cocktails | ${cocktail.name}`
  }, [dispatch, cocktail])

  return (
    <div className='cocktail-page'>
      <div className='description'>
        <h3>{cocktail.name}</h3>
        <ul>
          {cocktail.amount.map(({ id, value, unit, ingredientId }) => {
            const ingredient = ingredients.find(ingredient => ingredient.id === ingredientId)
            return <li key={id}>{`${ingredient.name} - ${value} ${unit}`}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default CocktailPage
