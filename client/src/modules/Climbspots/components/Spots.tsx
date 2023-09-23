import React from 'react'
import { useAppSelector } from 'hooks/index'
import { setActiveSpotId } from 'store/weatherSlice'

import Button from './Button'

const Spots: React.FC = () => {
  const { spots, activeSpotId } = useAppSelector(state => state.weather)

  return (
    <>
      {spots
        .filter(spot => spot.id !== 7)
        .map(({ id, name }) => (
          <Button
            key={id}
            className='col-5 col-lg-12 mb-2 mx-lg-0 mx-1 btn-shadow'
            handler={setActiveSpotId}
            value={id}
            text={name}
            isActive={activeSpotId === id}
          />
        ))}

      <div className='special-spot d-flex justify-content-center align-items-center flex-column'>
        <span>{'special for "Clear sky" <3'}</span>
        <Button
          key={7}
          className='col-5 col-lg-12 mb-2 mx-lg-0 mx-1 btn-shadow'
          handler={setActiveSpotId}
          value={7}
          text={'cirali'}
          isActive={activeSpotId === 7}
        />
      </div>
    </>
  )
}

export default Spots
