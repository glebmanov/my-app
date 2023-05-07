import React from 'react'
import Button from 'modules/Cocktails/components/Buttons/Button'
import { uniqueId } from 'lodash'
import { IngredientCategory } from 'types/cocktailsInterfaces'

interface CategoriesButtonsProps {
  ingredientCategories: Array<IngredientCategory>
  activeCategory: string
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>
}

const CategoriesButtons: React.FC<CategoriesButtonsProps> = ({
  ingredientCategories,
  activeCategory,
  setActiveCategory,
}) => {
  return (
    <div className='categories-buttons btn-group btn-group-sm'>
      {ingredientCategories.map(({ name }) => (
        <Button
          key={uniqueId()}
          handler={setActiveCategory}
          value={name}
          text={name}
          isActive={activeCategory === name}
        />
      ))}
      <Button handler={setActiveCategory} value={'all'} text={'all'} isActive={activeCategory === 'all'} />
    </div>
  )
}

export default CategoriesButtons
