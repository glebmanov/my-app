import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { getIngredientCategories, getIngredients, clearFilteredCocktails, getCocktails } from 'store/cocktailsSlice'
import Categories from '../components/Categories'
import ListCocktails from '../components/ListCocktails'
import ShowCocktailsButtons from '../components/Buttons/ShowCocktailsButtons'
import { Ingredient } from 'types/cocktailsInterfaces'

const IngredientsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const { ingredients, ingredientCategories, filteredCocktails } = useAppSelector(state => state.cocktails)
  const [checkedState, setCheckedState] = useState(new Array(ingredients.length).fill(false))
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([])
  const [activeOption, setActiveOption] = useState('includes')
  const options = ['includes', 'consist']

  const handleOnChange = (position: number, ingredient: Ingredient) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      if (index === position) {
        const isCheckboxActive = !item
        isCheckboxActive
          ? setSelectedIngredients([...selectedIngredients, ingredient.id])
          : setSelectedIngredients(
              selectedIngredients.filter(selectedIngredient => selectedIngredient !== ingredient.id),
            )
        return isCheckboxActive
      } else {
        return item
      }
    })

    setCheckedState(updatedCheckedState)
  }

  const showListCocktails = () => {
    selectedIngredients.length && dispatch(getCocktails({ type: activeOption, ingredients: selectedIngredients }))
  }

  const clearListCocktails = () => {
    setCheckedState(new Array(ingredients.length).fill(false))
    setSelectedIngredients([])
    dispatch(clearFilteredCocktails())
  }

  useEffect(() => {
    dispatch(getIngredientCategories())
    dispatch(getIngredients())

    if (!selectedIngredients.length && filteredCocktails.rows.length) dispatch(clearFilteredCocktails())
    document.title = 'Cocktails | Build cocktails'

    return () => {
      filteredCocktails.rows.length && dispatch(clearFilteredCocktails())
    }
  }, [])

  useEffect(() => {
    setCheckedState(new Array(ingredients.length).fill(false))
  }, [ingredients])

  return (
    <>
      <h1>Build cocktail by ingredients</h1>
      <div className='build-cocktails'>
        <Categories
          ingredientCategories={ingredientCategories}
          ingredients={ingredients}
          handleOnChange={handleOnChange}
          checkedState={checkedState}
          options={options}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
        <ShowCocktailsButtons show={showListCocktails} clear={clearListCocktails} />
        {!!filteredCocktails.rows?.length ? (
          <ListCocktails cocktails={filteredCocktails} showSizeButtons={false} />
        ) : null}
      </div>
    </>
  )
}

export default IngredientsPage
