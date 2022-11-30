import React from 'react'
import Button from './Button.jsx'

import { uniqueId } from 'lodash'

const CategoriesButtons = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className='categories-buttons btn-group btn-group-sm'>
      {categories.map(category => (
        <Button key={uniqueId()} handler={setActiveCategory} value={category} isActive={activeCategory === category} />
      ))}
      <Button handler={setActiveCategory} value={'all'} isActive={activeCategory === 'all'} />
    </div>
  )
}

export default CategoriesButtons
