import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Logo from './Logo'

const Layout: React.FC = () => {
  return (
    <>
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
