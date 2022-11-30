import React from 'react'

import cn from 'classnames'

const Button = ({ handler, value, isActive }) => {
  const classNames = cn(`btn btn-cstm`, { active: isActive })

  return (
    <button className={classNames} type='button' onClick={() => handler(value)}>
      <span>{value}</span>
    </button>
  )
}

export default Button
