import React, { useState } from 'react'
import CocktailItemBig from './CocktailItemBig'
import CocktailItemSmall from './CocktailItemSmall'
import ItemsSizeButtons from './ItemsSizeButtons'

const ListCocktails = ({ cocktails, showSizeButtons = true, openModal }) => {
  const sizes = ['small', 'big']
  const [activeSize, setActiveSize] = useState('small')

  const getSizeItem = cocktail => {
    switch (activeSize) {
      case 'small':
        return <CocktailItemSmall key={cocktail.id} name={cocktail.name} openModal={openModal} cocktail={cocktail} />
      case 'big':
        return <CocktailItemBig key={cocktail.id} name={cocktail.name} openModal={openModal} cocktail={cocktail} />

      default:
        break
    }
  }

  return (
    <>
      <div className='list-cocktails'>
        {cocktails.length && showSizeButtons ? (
          <ItemsSizeButtons sizes={sizes} activeSize={activeSize} setActiveSize={setActiveSize} />
        ) : null}
        <div className={`list-${activeSize}`}>{cocktails.map(cocktail => getSizeItem(cocktail))}</div>
      </div>
    </>
  )
}

export default ListCocktails
