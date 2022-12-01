import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSpotWeather } from 'store/weatherSlice'

import Spots from './components/Spots'
import SpotWeather from './components/SpotWeather'
import Warning from './components/Warning'

import './styles/app.scss'

const Climbspots = () => {
  const dispatch = useDispatch()
  const activeSpotId = useSelector(state => state.weather.activeSpotId)
  const endpoint = useSelector(state => state.weather.endpoint)
  const error = useSelector(state => state.weather.error)

  useEffect(() => {
    if (activeSpotId) dispatch(fetchSpotWeather())
  }, [dispatch, activeSpotId, endpoint])

  return (
    <div className='weather-wrapper d-flex flex-column justify-content-center pb-3'>
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
