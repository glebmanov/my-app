import React from 'react'
import Button from './Button.jsx'

import { uniqueId } from 'lodash'

const ItemsSizeButtons = ({ sizes, activeSize, setActiveSize }) => {
  return (
    <div className='items-size-button btn-group btn-group-sm'>
      {sizes.map(size => (
        <Button key={uniqueId()} handler={setActiveSize} value={size} isActive={activeSize === size} />
      ))}
    </div>
  )
}

export default ItemsSizeButtons
