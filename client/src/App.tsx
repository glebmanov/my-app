import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { check, getFavoriteCocktails } from 'store/userSlice'

import Homepage from 'pages/Homepage'
import Notfoundpage from 'pages/Notfoundpage'
import Layout from 'components/Layout'
import Login from 'components/Auth/Login'
import Registration from 'components/Auth/Registration'

import ClimbspotsLayout from 'modules/Climbspots/ClimbspotsLayout'
import WeatherPage from 'modules/Climbspots/pages/WeatherPage'

import CocktailsLayout from 'modules/Cocktails/CocktailsLayout'
import CocktailPage, { cocktailLoader } from 'modules/Cocktails/pages/CocktailPage'
import ListPage from 'modules/Cocktails/pages/ListPage'
import IngredientsPage from 'modules/Cocktails/pages/IngredientsPage'
import Favorites from 'modules/Cocktails/pages/Favorites'
import EditorPage from 'modules/Cocktails/pages/EditorPage'

import PrivateRoute from 'components/PrivateRoute'
import PrivateAdminRoute from 'components/PrivateAdminRoute'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Homepage />} />
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='climbspots' element={<ClimbspotsLayout />}>
        <Route index element={<Navigate replace to='weather' />} />
        <Route path='weather' element={<WeatherPage />} />
      </Route>
      <Route path='cocktails' element={<CocktailsLayout />}>
        <Route index element={<Navigate replace to='list' />} />
        <Route path='list' element={<ListPage />} />
        <Route path=':id' element={<CocktailPage />} loader={cocktailLoader} />
        <Route path='build' element={<IngredientsPage />} />
        <Route
          path='favorites'
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path='editor'
          element={
            <PrivateAdminRoute>
              <EditorPage />
            </PrivateAdminRoute>
          }
        />
      </Route>
      <Route path='*' element={<Notfoundpage />} />
    </Route>,
  ),
)

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.user)

  useEffect(() => {
    localStorage.getItem('token') &&
      dispatch(check())
        .unwrap()
        .then(response => {
          response.message && localStorage.removeItem('token')
          dispatch(getFavoriteCocktails())
        })
  }, [isAuth])

  return <RouterProvider router={router} />
}

export default App
