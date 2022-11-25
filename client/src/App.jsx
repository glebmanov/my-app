import React from 'react'
import ComponentContainer from './components/ComponentContainer.jsx'

const App = () => {
  return (
    <>
      <header></header>
      <main>
        <ComponentContainer name={'Climbspots'} description={'description'} />
        <ComponentContainer name={'Cocktails'} description={'description'} />
      </main>
      <footer></footer>
    </>
  )
}

export default App
