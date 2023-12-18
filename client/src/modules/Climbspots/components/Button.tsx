import React from 'react'
import { useAppDispatch } from 'hooks/useRedux'
import clsx from 'clsx'
interface ButtonProps {
  className?: string
  handler: any
  value: string | number
  text: string
  isActive: boolean
}

const Button: React.FC<ButtonProps> = ({ className, text, handler, value, isActive }) => {
  const dispatch = useAppDispatch()

  return (
    <button
      className={clsx(`btn btn-primary text-nowrap btn-cstm ${className}`, isActive && 'active')}
      type='button'
      onClick={() => dispatch(handler(value))}
    >
      {text}
    </button>
  )
}

export default Button
