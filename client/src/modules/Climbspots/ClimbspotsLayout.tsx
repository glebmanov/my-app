import React, { useEffect } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import './styles/climbspots.scss'
import { useAppDispatch } from 'hooks/useRedux'
import { setActiveSpotId } from 'store/weatherSlice'

const ClimbspotsLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    return () => {
      dispatch(setActiveSpotId(null))
    }
  }, [])

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
