import React from 'react'
import Button from './Button'

import { uniqueId } from 'lodash'

interface OptionButtonsProps {
  options: Array<string>
  activeOption: string
  handler: React.Dispatch<React.SetStateAction<string>>
}

const OptionButtons: React.FC<OptionButtonsProps> = ({ options, activeOption, handler }) => {
  return (
    <div className='option-buttons btn-group btn-group-sm'>
      {options.map(option => (
        <Button key={uniqueId()} handler={handler} value={option} text={option} isActive={activeOption === option} />
      ))}
    </div>
  )
}

export default OptionButtons
