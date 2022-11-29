import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ card }) => {
  return (
    <Link to={card.link}>
      <div className='component-card'>
        <h3>{card.name}</h3>
        <div>
          <span>{card.description}</span>
        </div>
      </div>
    </Link>
  )
}

export default Card
