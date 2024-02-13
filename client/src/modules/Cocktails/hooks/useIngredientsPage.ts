import { useAppDispatch, useAppSelector } from 'hooks/useRedux'
import { useEffect, useState } from 'react'
import { useIngredientsContext } from '../context'
import { Ingredient } from 'types/cocktailsInterfaces'
import { clearFilteredCocktails, getCocktails, getIngredientCategories, getIngredients } from 'store/cocktailsSlice'

export const useIngredientsPage = () => {
  const dispatch = useAppDispatch()
  const { ingredients, filteredCocktails } = useAppSelector(state => state.cocktails)
  const { activeOption } = useIngredientsContext()
  const [checkedState, setCheckedState] = useState(new Array(ingredients.length).fill(false))
  const [selectedIngredients, setSelectedIngredients] = useState<number[]>([])

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

  const hasFilteredCocktails = !!filteredCocktails.rows?.length

  return {
    checkedState,
    hasFilteredCocktails,
    filteredCocktails,
    handleOnChange,
    showListCocktails,
    clearListCocktails,
  }
}
