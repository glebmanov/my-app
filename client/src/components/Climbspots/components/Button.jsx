import React from 'react'
import { useDispatch } from 'react-redux'

import cn from 'classnames'

const Button = ({ className, name, handler, value, isActive }) => {
  const dispatch = useDispatch()

  const classNames = cn(`btn btn-primary text-nowrap ${className} btn-cstm`, { active: isActive })

  return (
    <button className={classNames} type='button' onClick={() => dispatch(handler(value))}>
      <span>{name}</span>
    </button>
  )
}

export default Button
