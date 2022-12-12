import React, { useState } from 'react'
import CocktailItemBig from './CocktailItemBig'
import CocktailItemSmall from './CocktailItemSmall'
import ItemsSizeButtons from './ItemsSizeButtons'

const ListCocktails = ({ cocktails, showSizeButtons = true }) => {
  const sizes = ['small', 'big']
  const [activeSize, setActiveSize] = useState('small')

  const getSizeItem = ({ id, name, img }) => {
    switch (activeSize) {
      case 'small':
        return <CocktailItemSmall key={id} id={id} name={name} />
      case 'big':
        return <CocktailItemBig key={id} id={id} name={name} img={img} />

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
