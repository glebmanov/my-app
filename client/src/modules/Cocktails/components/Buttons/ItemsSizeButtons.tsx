import React from 'react'
import Button from './Button'

import { uniqueId } from 'lodash'

interface ItemsSizeButtonsProps {
  sizes: Array<string>
  activeSize: string | number
  setActiveSize: React.Dispatch<React.SetStateAction<string>>
}

const ItemsSizeButtons: React.FC<ItemsSizeButtonsProps> = ({ sizes, activeSize, setActiveSize }) => {
  return (
    <div className='items-size-button btn-group btn-group-sm'>
      {sizes.map(size => (
        <Button key={uniqueId()} handler={setActiveSize} value={size} text={size} isActive={activeSize === size} />
      ))}
    </div>
  )
}

export default ItemsSizeButtons
