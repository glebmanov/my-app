import React from 'react'
import { useAppSelector } from 'hooks/index'
import { setActiveSpotId } from 'store/weatherSlice'

import Button from './Button'

const Spots: React.FC = () => {
  const { spots, activeSpotId } = useAppSelector(state => state.weather)

  return (
    <>
      {spots.map(({ id, name }) => (
        <Button
          key={id}
          className='col-5 col-lg-12 mb-2 mx-lg-0 mx-1 btn-shadow'
          handler={setActiveSpotId}
          value={id}
          text={name}
          isActive={activeSpotId === id}
        />
      ))}
    </>
  )
}

export default Spots
