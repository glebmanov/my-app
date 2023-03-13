import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getIngredientCategories,
  getIngredients,
  findOrCreateCocktail,
  clearFilteredCocktails,
} from 'store/cocktailsSlice'
import Categories from '../components/Categories'
import ListCocktails from '../components/ListCocktails'
import ShowCocktailsButtons from '../components/ShowCocktailsButtons'

const IngredientsPage = () => {
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.cocktails.ingredients)
  const ingredientCategories = useSelector(state => state.cocktails.ingredientCategories)
  const filteredCocktails = useSelector(state => state.cocktails.filteredCocktails)
  const [checkedState, setCheckedState] = useState(new Array(ingredients.length).fill(false))
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [activeOption, setActiveOption] = useState('includes')
  const options = ['includes', 'consist']

  const handleOnChange = (position, ingredient) => {
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
    selectedIngredients.length &&
      dispatch(findOrCreateCocktail({ type: activeOption, ingredients: selectedIngredients }))
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
  }, [dispatch])

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
        {filteredCocktails ? <ListCocktails cocktails={filteredCocktails} showSizeButtons={false} /> : null}
      </div>
    </>
  )
}

export default IngredientsPage
