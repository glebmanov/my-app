import React from 'react'

interface ShowCocktailsButtonsProps {
  show: () => void
  clear: () => void
}

const ShowCocktailsButtons: React.FC<ShowCocktailsButtonsProps> = ({ show, clear }) => {
  return (
    <div className='show-btn btn-group btn-group-sm'>
      <button className={'btn btn-cstm'} type='button' onClick={show}>
        <span>show</span>
      </button>
      <button className={'btn btn-cstm'} type='button' onClick={clear}>
        <span>clear</span>
      </button>
    </div>
  )
}

export default ShowCocktailsButtons
