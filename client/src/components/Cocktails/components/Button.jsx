import React from 'react'

import cn from 'classnames'

const Button = ({ handler, value, text, isActive }) => {
  const classNames = cn(`btn btn-cstm`, { active: isActive })

  return (
    <button className={classNames} type='button' onClick={() => handler(value)}>
      <span>{text}</span>
    </button>
  )
}

export default Button
