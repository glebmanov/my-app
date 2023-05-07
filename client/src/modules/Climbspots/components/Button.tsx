import React from 'react'
import cn from 'classnames'
import { useAppDispatch } from 'hooks/useRedux'
interface ButtonProps {
  className?: string
  handler: any
  value: string | number
  text: string
  isActive: boolean
}

const Button: React.FC<ButtonProps> = ({ className, text, handler, value, isActive }) => {
  const dispatch = useAppDispatch()

  const classNames = cn(`btn btn-primary text-nowrap btn-cstm ${className}`, {
    active: isActive,
  })

  return (
    <button className={classNames} type='button' onClick={() => dispatch(handler(value))}>
      {text}
    </button>
  )
}

export default Button
