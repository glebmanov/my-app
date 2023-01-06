import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CocktailItemBig from './CocktailItemBig'
import CocktailItemSmall from './CocktailItemSmall'
import ItemsSizeButtons from './ItemsSizeButtons'
import SearchInput from './SearchInput'

const ListCocktails = ({ cocktails, showSizeButtons = true }) => {
  const searchedCocktails = useSelector(state => state.cocktails.searchedCocktails)
  const sizes = ['small', 'big']
  const [activeSize, setActiveSize] = useState('small')

  const getSizeItem = ({ id, name, img }) => {
    switch (activeSize) {
      case 'big':
        return <CocktailItemBig key={id} id={id} name={name} img={img} />
      default:
        return <CocktailItemSmall key={id} id={id} name={name} />
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
