import React from 'react'
import Card from '../components/Card.jsx'
import { uniqueId } from 'lodash'

const cards = [
  {
    name: 'Climbspots',
    description: 'show the weather in the climbing spots',
    link: '/climbspots',
  },
  {
    name: 'Cocktails',
    description: 'build and search cocktails by ingredients',
    link: '/cocktails',
  },
]

const MainPage = () => {
  return (
    <div className='main-page'>
      {cards.map(card => (
        <Card key={uniqueId()} card={card} />
      ))}
    </div>
  )
}

export default MainPage
