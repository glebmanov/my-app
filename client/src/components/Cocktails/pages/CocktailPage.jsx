import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOneCocktail } from 'store/cocktailsSlice'

const CocktailPage = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [cocktail, setCocktail] = useState({ name: '', amount: [], img: '' })
  const ingredients = useSelector(state => state.cocktails.ingredients)

  useEffect(() => {
    dispatch(getOneCocktail({ id })).then(({ payload }) => {
      setCocktail(payload.data)
      document.title = `Cocktails | ${payload.data.name}`
    })
  }, [dispatch])

  return (
    <div className='cocktail-page'>
      <h2>{cocktail.name}</h2>
      <div className='cocktail-container'>
        <img src={cocktail.img} alt='cocktail-img' />
        <div className='description-container'>
          <ul className='cocktail-amount'>
            {cocktail.amount.map(({ id, value, unit, ingredientId }) => {
              const ingredient = ingredients.find(ingredient => ingredient.id === ingredientId)
              return <li key={id}>{`${ingredient.name} - ${value} ${unit}`}</li>
            })}
          </ul>
          <span className='cocktail-description'>{cocktail.description}</span>
        </div>
      </div>
    </div>
  )
}

export default CocktailPage
