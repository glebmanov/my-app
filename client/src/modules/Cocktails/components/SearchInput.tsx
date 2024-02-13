import React, { FormEvent, MouseEventHandler, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { getCocktails, clearSearchedCocktails } from 'store/cocktailsSlice'
import debounce from 'lodash/debounce'

const SearchInput: React.FC = () => {
  const dispatch = useAppDispatch()
  const searchedCocktails = useAppSelector(state => state.cocktails.searchedCocktails)
  const handlerInput = debounce(
    e => (e.target.value ? dispatch(getCocktails({ substring: e.target.value })) : dispatch(clearSearchedCocktails())),
    300,
  )
  const handlerClear: MouseEventHandler = e => {
    const target = e.target as HTMLButtonElement
    target.value = ''
    dispatch(clearSearchedCocktails())
  }

  useEffect(() => {
    return () => {
      searchedCocktails.rows.length && dispatch(clearSearchedCocktails())
    }
  }, [])

  return (
    <div className='search'>
      <input type='text' onInput={(e: FormEvent<HTMLInputElement>) => handlerInput(e)} />
      <i onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handlerClear(e)}></i>
    </div>
  )
}

export default SearchInput
