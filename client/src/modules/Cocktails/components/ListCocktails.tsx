import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import CocktailItemBig from './CocktailItemBig'
import CocktailItemSmall from './CocktailItemSmall'
import { ItemsSizeButtons } from './Buttons/ItemsSizeButtons'
import SearchInput from './SearchInput'
import { getCocktailCategories, getCocktails, setPage } from 'store/cocktailsSlice'
import { Cocktail } from 'types/cocktailsInterfaces'

interface ListCocktailsProps {
  cocktails: {
    count: number
    rows: Array<Cocktail>
  }
  showSizeButtons?: boolean
}

export const ListCocktails: React.FC<ListCocktailsProps> = ({ cocktails, showSizeButtons = true }) => {
  const dispatch = useAppDispatch()
  const { page, searchedCocktails } = useAppSelector(state => state.cocktails)
  const sizes = ['small', 'big']
  const [activeSize, setActiveSize] = useState('small')

  useEffect(() => {
    dispatch(getCocktailCategories())
  }, [])

  useEffect(() => {
    dispatch(getCocktails({ page }))
  }, [page])

  const getSizeItem = ({ id, name, img, category_cocktail_name_id }: Cocktail) => {
    switch (activeSize) {
      case 'big':
        return <CocktailItemBig key={id} id={id} name={name} img={img} category={category_cocktail_name_id} />
      default:
        return <CocktailItemSmall key={id} id={id} name={name} category={category_cocktail_name_id} />
    }
  }

  return (
    <>
      <div className='list-cocktails'>
        {showSizeButtons ? (
          <div className='buttons-and-search'>
            <ItemsSizeButtons sizes={sizes} activeSize={activeSize} setActiveSize={setActiveSize} />
            <SearchInput />
          </div>
        ) : null}
        <div className={`list-${activeSize}`}>
          {searchedCocktails.rows.length
            ? searchedCocktails.rows?.map(cocktail => getSizeItem(cocktail))
            : cocktails.rows?.map(cocktail => getSizeItem(cocktail))}
        </div>
      </div>
      <PaginationControl
        page={page}
        total={cocktails.count}
        limit={8}
        changePage={page => {
          dispatch(setPage(page))
        }}
        ellipsis={1}
      />
    </>
  )
}
