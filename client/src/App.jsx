import React from 'react'
import { Routes, Route } from 'react-router-dom'
import MainPage from './pages/MainPage.jsx'
import Cocktails from './Cocktails/Cocktails.jsx'

const App = () => {
  return (
    <>
      <header></header>
      <main>
        <Routes>
          <Route path='/' element={<MainPage />} />
          {/* <Route path='/climbspots' element={<Climbspots />} /> */}
          <Route path='/cocktails' element={<Cocktails />} />
        </Routes>
      </main>
      <footer></footer>
    </>
  )
}

export default App
