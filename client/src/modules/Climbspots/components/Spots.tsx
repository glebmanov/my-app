import React from 'react'
import { useAppSelector } from 'hooks/index'
import { setActiveSpotId } from 'store/weatherSlice'

import Button from './Button'

const Spots = () => {
  const spots = useAppSelector(state => state.weather.spots)
  const activeSpotId = useAppSelector(state => state.weather.activeSpotId)

  return (
    <>
      {spots.map(({ id, name }) => (
        <Button
          className='col-5 col-lg-12 mb-2 mx-lg-0 mx-1 btn-shadow'
          key={id}
          name={name}
          handler={setActiveSpotId}
          value={id}
          isActive={activeSpotId === id}
        />
      ))}
    </>
  )
}

export default Spots
