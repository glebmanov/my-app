import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <span>
        <Link to='/climbspots'>Climbspots</Link>
      </span>
      <span>
        <Link to='/cocktails'>Cocktails</Link>
      </span>
      <span>
        <Link to='/auth'>Sign in</Link>
      </span>
    </nav>
  )
}

export default Navigation
