import React from 'react'
import cn from 'classnames'
import { useAppDispatch } from 'hooks/useRedux'
interface ButtonProps {
  handler: any
  value: string | number
  text: string
  isActive: boolean
}

const Button: React.FC<ButtonProps> = ({ text, handler, value, isActive }) => {
  const dispatch = useAppDispatch()

  const classNames = cn('btn-cstm', { active: isActive })

  return (
    <button className={classNames} type='button' onClick={() => dispatch(handler(value))}>
      <span>{text}</span>
    </button>
  )
}

export default Button
