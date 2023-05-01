import React from 'react'
import cn from 'classnames'

interface ButtonProps {
  handler: React.Dispatch<React.SetStateAction<string>>
  value: string
  text: string
  isActive?: boolean
}

const Button: React.FC<ButtonProps> = ({ handler, value, text, isActive }) => {
  const classNames = cn(`btn btn-cstm`, { active: isActive })

  return (
    <button className={classNames} type='button' onClick={() => handler(value)}>
      <span>{text}</span>
    </button>
  )
}

export default Button
