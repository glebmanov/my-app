import React from 'react'
import uniqueId from 'lodash/uniqueId'
import Button from 'modules/Cocktails/components/Buttons/Button'

interface ItemsSizeButtonsProps {
  sizes: Array<string>
  activeSize: string | number
  setActiveSize: React.Dispatch<React.SetStateAction<string>>
}

export const ItemsSizeButtons: React.FC<ItemsSizeButtonsProps> = ({ sizes, activeSize, setActiveSize }) => {
  return (
    <div className='items-size-button btn-group btn-group-sm'>
      {sizes.map(size => (
        <Button key={uniqueId()} handler={setActiveSize} value={size} text={size} isActive={activeSize === size} />
      ))}
    </div>
  )
}
