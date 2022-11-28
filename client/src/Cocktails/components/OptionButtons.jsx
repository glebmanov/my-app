import React from 'react'
import Button from './Button.jsx'

import { uniqueId } from 'lodash'

const OptionButtons = ({ options, activeOption, handler }) => {
  return (
    <div className='option-buttons btn-group btn-group-sm'>
      {options.map(option => (
        <Button key={uniqueId()} handler={handler} value={option} isActive={activeOption === option} />
      ))}
    </div>
  )
}

export default OptionButtons
