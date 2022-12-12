import React, { useState } from 'react'
import Categories from '../components/Categories'
import ListCocktails from '../components/ListCocktails'
import ShowCocktailsButtons from '../components/ShowCocktailsButtons'

const IngredientsPage = ({ cocktails, ingredientList, categories }) => {
  document.title = 'Cocktails | Build cocktails'

  const [checkedState, setCheckedState] = useState(new Array(ingredientList.length).fill(false))
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [filteredList, setFilteredList] = useState([])
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
    setCheckedState(new Array(ingredientList.length).fill(false))
    setCheckedState(updatedCheckedState)
  }

  const showListCocktails = () => {
    switch (activeOption) {
      case 'includes':
        const listIncludesIngredients = cocktails.filter(
          ({ amount }) => amount.filter(({ ingredientId }) => selectedIngredients.includes(ingredientId)).length > 0,
        )
        setFilteredList(listIncludesIngredients)
        break
      case 'consist':
        const listConsistIngredients = cocktails.filter(({ amount }) =>
          amount.every(({ ingredientId }) => selectedIngredients.includes(ingredientId)),
        )
        console.log('listConsistIngredients', listConsistIngredients)
        setFilteredList(listConsistIngredients)
        break
      default:
        break
    }
  }

  const clearListCocktails = () => {
    setCheckedState(new Array(ingredientList.length).fill(false))
    setSelectedIngredients([])
    setFilteredList([])
  }

  return (
    <>
      <h1>Build cocktail by ingredients</h1>
      <div className='build-cocktails'>
        <Categories
          categories={categories}
          ingredientList={ingredientList}
          handleOnChange={handleOnChange}
          checkedState={checkedState}
          options={options}
          activeOption={activeOption}
          setActiveOption={setActiveOption}
        />
        <ShowCocktailsButtons show={showListCocktails} clear={clearListCocktails} />
        {filteredList ? (
          <ListCocktails cocktails={filteredList} ingredientList={ingredientList} showSizeButtons={false} />
        ) : null}
      </div>
    </>
  )
}

export default IngredientsPage
