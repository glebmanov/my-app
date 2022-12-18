import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <nav>
      <Link to='climbspots'>
        <span>Climbspots</span>
      </Link>
      <Link to='cocktails'>
        <span>Cocktails</span>
      </Link>
      <Link to='login'>
        <span>Sign in</span>
      </Link>
    </nav>
  )
}

export default Navigation
