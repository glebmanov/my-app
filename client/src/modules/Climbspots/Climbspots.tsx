import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { fetchSpotWeather } from 'store/weatherSlice'

import Spots from './components/Spots'
import SpotWeather from './components/SpotWeather'
import Warning from './components/Warning'

import './styles/app.scss'

const Climbspots: React.FC = () => {
  const dispatch = useAppDispatch()
  const activeSpotId = useAppSelector(state => state.weather.activeSpotId)
  const endpoint = useAppSelector(state => state.weather.endpoint)
  const error = useAppSelector(state => state.weather.error)

  useEffect(() => {
    document.title = 'Climbspots | Weather'

    if (activeSpotId) dispatch(fetchSpotWeather())
  }, [activeSpotId, endpoint])

  return (
    <div className='weather-wrapper pb-3'>
      <h1 className='text-center'>Weather in the climbing spots of the Leningrad region and Karelia</h1>
      <div className='weather-content d-flex flex-column flex-lg-row row p-0 p-lg-3'>
        <div className='spot-list col-lg-2 d-flex flex-wrap flex-row flex-lg-column py-4 justify-content-center justify-content-lg-start'>
          <Spots />
        </div>
        <div className='spot-weather col-lg-10'>{error ? <Warning error={error} /> : <SpotWeather />}</div>
      </div>
    </div>
  )
}

export default Climbspots
