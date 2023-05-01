import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { getOneCocktail, getIngredients } from 'store/cocktailsSlice'
import { Amount } from 'types/cocktailsInterfaces'

const CocktailPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const id = params.id as string
  const [cocktail, setCocktail] = useState<{ name: string; amount: Array<Amount>; img: string; description: string }>({
    name: '',
    amount: [],
    img: '',
    description: '',
  })
  const ingredients = useAppSelector(state => state.cocktails.ingredients)

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getOneCocktail({ id })).then(action => {
      const payload = action.payload as { name: string; amount: Array<Amount>; img: string; description: string }
      setCocktail(payload)
      document.title = `Cocktails | ${payload.name as string}`
    })
  }, [])

  return (
    <div className='cocktail-page'>
      <h2>{cocktail.name}</h2>
      <div className='cocktail-container'>
        <img src={cocktail.img} alt='cocktail-img' />
        <div className='description-container'>
          <ul className='cocktail-amount'>
            {cocktail.amount.map(({ id, value, unit, ingredientId }) => {
              const ingredient = ingredients.find(ingredient => ingredient.id === ingredientId)
              return <li key={id}>{`${ingredient?.name} - ${value} ${unit}`}</li>
            })}
          </ul>
          <span className='cocktail-description'>{cocktail.description}</span>
        </div>
      </div>
    </div>
  )
}

export default CocktailPage
