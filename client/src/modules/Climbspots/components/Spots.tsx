import React from 'react'
import { useAppSelector } from 'hooks/index'
import { setActiveSpotId } from 'store/weatherSlice'

import Button from './Button'

const Spots = () => {
  const { spots, activeSpotId } = useAppSelector(state => state.weather)

  return (
    <>
      {spots.map(({ id, name }) => (
        <Button key={id} handler={setActiveSpotId} value={id} text={name} isActive={activeSpotId === id} />
      ))}
    </>
  )
}

export default Spots
