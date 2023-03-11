import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CocktailItemBig from './CocktailItemBig'
import CocktailItemSmall from './CocktailItemSmall'
import ItemsSizeButtons from './ItemsSizeButtons'
import SearchInput from './SearchInput'
import { getCocktailCategories } from 'store/cocktailsSlice'

const ListCocktails = ({ cocktails, showSizeButtons = true }) => {
  const dispatch = useDispatch()
  const searchedCocktails = useSelector(state => state.cocktails.searchedCocktails)
  const sizes = ['small', 'big']
  const [activeSize, setActiveSize] = useState('small')

  useEffect(() => {
    dispatch(getCocktailCategories())
  }, [])

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
    </>
  )
}

export default ListCocktails
