import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { getCocktails } from 'store/cocktailsSlice'
import { ListCocktails } from '../components/ListCocktails'

const ListPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const cocktails = useAppSelector(state => state.cocktails.cocktails)

  useEffect(() => {
    dispatch(getCocktails({}))
    document.title = 'Cocktails | List cocktails'
  }, [])

  return (
    <>
      <h1>Search cocktails</h1>
      {!!cocktails.rows?.length && <ListCocktails cocktails={cocktails} />}
    </>
  )
}

export default ListPage
