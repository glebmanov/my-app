import React from 'react'
import { useAppDispatch } from 'hooks/index'
import cn from 'classnames'

interface ButtonProps {
  className?: string
  name: string
  handler: any
  value: string | number
  isActive: boolean
}

const Button: React.FC<ButtonProps> = ({ className, name, handler, value, isActive }) => {
  const dispatch = useAppDispatch()

  const classNames = cn(`btn btn-primary text-nowrap ${className} btn-cstm`, { active: isActive })

  return (
    <button className={classNames} type='button' onClick={() => dispatch(handler(value))}>
      <span>{name}</span>
    </button>
  )
}

export default Button
