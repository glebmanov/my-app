import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import './styles/climbspots.scss'

const ClimbspotsLayout: React.FC = () => {
  return (
    <>
      <nav>
        <NavLink to='weather'>Weather</NavLink>
      </nav>
      <div className='content'>
        <Outlet />
      </div>
    </>
  )
}

export default ClimbspotsLayout
