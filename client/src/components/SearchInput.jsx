import React from 'react'
import { useDispatch } from 'react-redux'
import { getCocktails, clearSearchedCocktailsCocktails } from 'store/cocktailsSlice'
import { debounce } from 'lodash'

const SearchInput = () => {
  const dispatch = useDispatch()
  const handlerInput = debounce(
    e =>
      e.target.value
        ? dispatch(getCocktails({ substring: e.target.value }))
        : dispatch(clearSearchedCocktailsCocktails()),
    500,
  )
  const handlerClear = e => {
    e.target.value = ''
    dispatch(clearSearchedCocktailsCocktails())
  }

  return (
    <div className='search' onInput={e => handlerInput(e)}>
      <input type='text' />
      <i onClick={e => handlerClear(e)}></i>
    </div>
  )
}

export default SearchInput
