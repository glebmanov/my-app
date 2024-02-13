import React, { FC } from 'react'
import uniqueId from 'lodash/uniqueId'
import Button from 'modules/Cocktails/components/Buttons/Button'
import { cocktailsSearchOptions } from 'modules/Cocktails/utils'
import { useIngredientsContext } from 'modules/Cocktails/context'

export const OptionButtons: FC = () => {
  const { activeOption, setActiveOption } = useIngredientsContext()

  return (
    <div className='option-buttons btn-group btn-group-sm'>
      {cocktailsSearchOptions.map(option => (
        <Button
          key={uniqueId()}
          handler={setActiveOption}
          value={option}
          text={option}
          isActive={activeOption === option}
        />
      ))}
    </div>
  )
}
