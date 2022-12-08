import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Auth from './components/Auth'
import Homepage from './pages/Homepage'
import Notfoundpage from './pages/Notfoundpage'
import Climbspots from './components/Climbspots/Climbspots'
import Cocktails from './components/Cocktails/Cocktails'
import Layout from './components/Layout'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='auth' element={<Auth />} />
        <Route path='climbspots' element={<Climbspots />} />
        <Route path='cocktails' element={<Cocktails />} />
        <Route path='*' element={<Notfoundpage />} />
      </Route>
    </Routes>
  )
}

export default App
