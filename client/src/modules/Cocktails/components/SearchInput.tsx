import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { getCocktails, clearSearchedCocktails } from 'store/cocktailsSlice'
import { debounce } from 'lodash'

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch()
  const searchedCocktails = useAppSelector(state => state.cocktails.searchedCocktails)
  const handlerInput = debounce(
    e => (e.target.value ? dispatch(getCocktails({ substring: e.target.value })) : dispatch(clearSearchedCocktails())),
    300,
  )
  const handlerClear = e => {
    e.target.value = ''
    dispatch(clearSearchedCocktails())
  }

  useEffect(() => {
    return () => {
      searchedCocktails.rows.length && dispatch(clearSearchedCocktails())
    }
  }, [])

  return (
    <div className='search' onInput={e => handlerInput(e)}>
      <input type='text' />
      <i onClick={e => handlerClear(e)}></i>
    </div>
  )
}

export default SearchInput
