import React, { FC } from 'react'
import uniqueId from 'lodash/uniqueId'
import { useAppSelector } from 'hooks/useRedux'
import Button from 'modules/Cocktails/components/Buttons/Button'
import { useIngredientsContext } from 'modules/Cocktails/context'

export const CategoriesButtons: FC = () => {
  const { ingredientCategories } = useAppSelector(state => state.cocktails)
  const { activeCategory, setActiveCategory } = useIngredientsContext()

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
