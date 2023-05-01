import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { check } from 'store/userSlice'

import Layout from 'components/Layout'
import Homepage from 'pages/Homepage'
import Login from 'components/Auth/Login'
import Registration from 'components/Auth/Registration'
import Climbspots from 'modules/Climbspots/Climbspots'
import Cocktails from 'modules/Cocktails/Cocktails'
import Notfoundpage from 'pages/Notfoundpage'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.user.isAuth)

  useEffect(() => {
    localStorage.getItem('token') &&
      dispatch(check())
        .unwrap()
        .then(response => {
          response.message && localStorage.removeItem('token')
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
