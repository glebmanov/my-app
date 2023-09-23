import React, { lazy, useEffect } from 'react'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { check, getFavoriteCocktails } from 'store/userSlice'

import Layout from 'components/Layout'
import PrivateRoute from 'components/PrivateRoute'
import PrivateAdminRoute from 'components/PrivateAdminRoute'

const Login = lazy(() => import('components/Auth/Login'))
const Registration = lazy(() => import('components/Auth/Registration'))
const Homepage = lazy(() => import('pages/Homepage'))
const Notfoundpage = lazy(() => import('pages/Notfoundpage'))

const ClimbspotsLayout = lazy(() => import('modules/Climbspots/ClimbspotsLayout'))
const WeatherPage = lazy(() => import('modules/Climbspots/pages/WeatherPage'))

const CocktailsLayout = lazy(() => import('modules/Cocktails/CocktailsLayout'))
const CocktailPage = lazy(() => import('modules/Cocktails/pages/CocktailPage'))
const ListPage = lazy(() => import('modules/Cocktails/pages/ListPage'))
const IngredientsPage = lazy(() => import('modules/Cocktails/pages/IngredientsPage'))
const Favorites = lazy(() => import('modules/Cocktails/pages/Favorites'))
const EditorPage = lazy(() => import('modules/Cocktails/pages/EditorPage'))
import { cocktailLoader } from 'modules/Cocktails/pages/CocktailPage'

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
    dispatch(check())
    isAuth && dispatch(getFavoriteCocktails())
  }, [isAuth])

  return <RouterProvider router={router} />
}

export default App
