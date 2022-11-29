import React, { useState } from 'react'
import CocktailItemMedium from './CocktailItemMedium.jsx'
import CocktailItemBig from './CocktailItemBig.jsx'
import CocktailItemSmall from './CocktailItemSmall.jsx'
import ItemsSizeButtons from './ItemsSizeButtons.jsx'

const ListCocktails = ({ cocktails, ingredientList, showSizeButtons = true, openModal }) => {
  const sizes = ['small', 'medium', 'big']
  const [activeSize, setActiveSize] = useState('small')

  const getSizeItem = cocktail => {
    switch (activeSize) {
      case 'small':
        return <CocktailItemSmall key={cocktail.id} name={cocktail.name} openModal={openModal} cocktail={cocktail} />
      case 'big':
        return <CocktailItemBig key={cocktail.id} name={cocktail.name} openModal={openModal} cocktail={cocktail} />

      default:
        return (
          <CocktailItemMedium
            key={cocktail.id}
            cocktail={cocktail}
            ingredientList={ingredientList}
            openModal={openModal}
          />
        )
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
