import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PaginationControl } from 'react-bootstrap-pagination-control'
import CocktailItemBig from './CocktailItemBig'
import CocktailItemSmall from './CocktailItemSmall'
import ItemsSizeButtons from './ItemsSizeButtons'
import SearchInput from './SearchInput'
import { getCocktailCategories, getCocktails } from 'store/cocktailsSlice'

const ListCocktails = ({ cocktails, showSizeButtons = true }) => {
  const dispatch = useDispatch()
  const searchedCocktails = useSelector(state => state.cocktails.searchedCocktails)
  const sizes = ['small', 'big']
  const [activeSize, setActiveSize] = useState('small')
  const [page, setPage] = useState(1)

  useEffect(() => {
    dispatch(getCocktailCategories())
  }, [])

  useEffect(() => {
    dispatch(getCocktails({ page }))
  }, [page])

  const getSizeItem = ({ id, name, img, category_cocktail_name_id }) => {
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
          setPage(page)
        }}
        ellipsis={1}
      />
    </>
  )
}

export default ListCocktails
