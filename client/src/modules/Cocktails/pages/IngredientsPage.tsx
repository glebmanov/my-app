import React, { FC } from 'react'
import { Categories } from '../components/Categories'
import { ListCocktails } from '../components/ListCocktails'
import { ShowCocktailsButtons } from '../components/Buttons/ShowCocktailsButtons'
import { ListIngredients } from '../components/ListIngredients'
import { useIngredientsPage } from '../hooks'

const IngredientsPage: FC = () => {
  const {
    checkedState,
    hasFilteredCocktails,
    filteredCocktails,
    handleOnChange,
    showListCocktails,
    clearListCocktails,
  } = useIngredientsPage()

  return (
    <>
      <h1>Build cocktail by ingredients</h1>

      <div className='build-cocktails'>
        <Categories />

        <ListIngredients handleOnChange={handleOnChange} checkedState={checkedState} />

        <ShowCocktailsButtons show={showListCocktails} clear={clearListCocktails} />

        {hasFilteredCocktails && <ListCocktails cocktails={filteredCocktails} showSizeButtons={false} />}
      </div>
    </>
  )
}

export default IngredientsPage
