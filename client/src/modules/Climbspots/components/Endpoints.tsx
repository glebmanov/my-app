import React from 'react'
import { useAppSelector } from 'hooks/index'
import { setEndpoint } from 'store/weatherSlice'

import Button from './Button'

import { uniqueId } from 'lodash'

const Endpoints: React.FC = () => {
  const currentEndpoint = useAppSelector(state => state.weather.endpoint)
  const endpoints = [
    { name: 'Weekends', value: 'forecast/daily' },
    { name: 'For 5 days', value: 'forecast/3hourly' },
    { name: 'Current', value: 'current' },
  ]

  return (
    <div className='endpoints d-flex flex-row btn-group col-md-6 col-12'>
      {endpoints.map(endpoint => (
        <Button
          key={uniqueId()}
          name={endpoint.name}
          handler={setEndpoint}
          value={endpoint.value}
          isActive={endpoint.value === currentEndpoint}
        />
      ))}
    </div>
  )
}

export default Endpoints
