import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAppSelector } from 'hooks/index'

import './styles/cocktails.scss'

const CocktailsLayout: React.FC = () => {
  const role = useAppSelector(state => state.user.role)
  const isAdmin = role === 'admin'
  const isAuth = useAppSelector(state => state.user.isAuth)

  return (
    <>
      <nav>
        <NavLink to='list'>Search</NavLink>
        <NavLink to='build'>Build</NavLink>
        {isAuth && <NavLink to='favorites'>Favorite</NavLink>}
        {isAdmin && <NavLink to='editor'>Editor</NavLink>}
      </nav>
      <div className='content'>
        <Outlet />
      </div>
    </>
  )
}

export default CocktailsLayout
