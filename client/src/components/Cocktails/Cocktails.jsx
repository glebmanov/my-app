import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import CocktailPage from './pages/CocktailPage'
import CocktailsPage from './pages/CocktailsPage'
import IngredientsPage from './pages/IngredientsPage'
import EditorPage from './pages/EditorPage'
import Favorites from './pages/Favorites'

import './styles/cocktails.scss'

const Cocktails = () => {
  const isAuth = useSelector(state => state.user.isAuth)

  return (
    <>
      <div className='nav'>
        <nav>
          <Link to='/cocktails'>
            <span>Search</span>
          </Link>
          <Link to='build'>
            <span>Build</span>
          </Link>
          {isAuth && (
            <Link to='favorites'>
              <span>Favorite</span>
            </Link>
          )}
          {isAuth && (
            <Link to='editor'>
              <span>Editor</span>
            </Link>
          )}
        </nav>
      </div>
      <div className='content'>
        <Routes>
          <Route index element={<CocktailsPage />} />
          <Route path=':id' element={<CocktailPage />} />
          <Route path='build' element={<IngredientsPage />} />
          {isAuth && <Route path='favorites' element={<Favorites />} />}
          {isAuth && <Route path='editor' element={<EditorPage />} />}
        </Routes>
      </div>
    </>
  )
}

export default Cocktails
