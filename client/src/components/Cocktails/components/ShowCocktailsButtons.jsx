import React from 'react'
import Button from './Button'

const ShowCocktailsButtons = ({ show, clear }) => {
  return (
    <div className='show-btn btn-group btn-group-sm'>
      <Button handler={show} text={'show'} />
      <Button handler={clear} text={'clear'} />
    </div>
  )
}

export default ShowCocktailsButtons
