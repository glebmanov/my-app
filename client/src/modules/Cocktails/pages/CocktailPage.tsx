import React, { Suspense, useEffect } from 'react'
import { defer, Await, useAsyncValue, useLoaderData } from 'react-router-dom'
import ky from 'ky'
import { SingleCocktail } from 'types/cocktailsInterfaces'
import Loader from 'components/Loader'

const CocktailElement: React.FC = () => {
  const cocktail = useAsyncValue() as SingleCocktail

  useEffect(() => {
    document.title = `Cocktails | ${cocktail.name}`
  }, [])

  return (
    <>
      <h1>{cocktail.name}</h1>
      <div className='cocktail-container'>
        <img src={`/${cocktail.img}`} alt='cocktail-img' />
        <div className='description-container'>
          <ul className='cocktail-amount'>
            {cocktail.amount.map(({ id, value, unit, ingredient }) => (
              <li key={id}>{`${ingredient?.name} - ${value} ${unit}`}</li>
            ))}
          </ul>
          <span className='cocktail-description'>{cocktail.description}</span>
        </div>
      </div>
    </>
  )
}

const CocktailPage: React.FC = () => {
  const { cocktail } = useLoaderData() as { cocktail: SingleCocktail }

  return (
    <div className='cocktail-page'>
      <Suspense fallback={<Loader />}>
        <Await resolve={cocktail}>
          <CocktailElement />
        </Await>
      </Suspense>
    </div>
  )
}

const getCocktail = async (id: string) => await ky.get(`/api/cocktail/${id}`).json()

export const cocktailLoader = async ({ params }) => {
  const { id } = params

  return defer({
    cocktail: getCocktail(id),
  })
}

export default CocktailPage
