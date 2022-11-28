import React, { useState } from 'react'
import CocktailItemMedium from './CocktailItemMedium.jsx'
import CocktailItemBig from './CocktailItemBig.jsx'
import CocktailItemSmall from './CocktailItemSmall.jsx'
import ItemsSizeButtons from './ItemsSizeButtons.jsx'

const ListCocktails = ({ cocktails, ingredientList, showSizeButtons = true }) => {
  const sizes = ['small', 'medium', 'big']
  const [activeSize, setActiveSize] = useState('small')

  const getSizeItem = (id, name, ingredients, amount) => {
    switch (activeSize) {
      case 'small':
        return <CocktailItemSmall key={id} name={name} />
      case 'big':
        return <CocktailItemBig key={id} name={name} />

      default:
        return (
          <CocktailItemMedium
            key={id}
            name={name}
            ingredients={ingredients}
            ingredientList={ingredientList}
            amount={amount}
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
        <div className={`list-${activeSize}`}>
          {cocktails.map(({ id, name, ingredients, amount }) => getSizeItem(id, name, ingredients, amount))}
        </div>
      </div>
    </>
  )
}

export default ListCocktails
