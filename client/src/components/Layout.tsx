import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Logo from './Logo'
import Loader from './Loader'

const Layout: React.FC = () => {
  return (
    <>
      <header>
        <Logo />
        <Navigation />
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}

export default Layout
