import React from 'react'
import clsx from 'clsx'

interface ButtonProps {
  handler: React.Dispatch<React.SetStateAction<string>>
  value: string
  text: string
  isActive?: boolean
}

const Button: React.FC<ButtonProps> = ({ handler, value, text, isActive }) => {
  return (
    <button className={clsx('btn btn-cstm', isActive && 'active')} type='button' onClick={() => handler(value)}>
      <span>{text}</span>
    </button>
  )
}

export default Button
