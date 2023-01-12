import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { check, getFavoriteCocktails } from 'store/userSlice'

import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import Login from './components/Auth/Login'
import Registration from './components/Auth/Registration'
import Climbspots from './components/Climbspots/Climbspots'
import Cocktails from './components/Cocktails/Cocktails'
import Notfoundpage from './pages/Notfoundpage'

const App = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.user.isAuth)

  useEffect(() => {
    localStorage.getItem('token') &&
      dispatch(check()).then(({ error, payload }) => {
        if (!error) {
          dispatch(getFavoriteCocktails())
        } else {
          alert(payload.message)
          localStorage.removeItem('token')
        }
      })
  }, [isAuth])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='login' element={<Login />} />
        <Route path='registration' element={<Registration />} />
        <Route path='climbspots' element={<Climbspots />} />
        <Route path='cocktails/*' element={<Cocktails />} />
        <Route path='*' element={<Notfoundpage />} />
      </Route>
    </Routes>
  )
}

export default App
