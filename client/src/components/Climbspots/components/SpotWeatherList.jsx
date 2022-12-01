import React from 'react'

import { getDate } from 'utils/date'
import { uniqueId } from 'lodash'

const SpotWeatherList = ({ data }) =>
  data.map(dataUnit => {
    const { weekday, day, time } = getDate(dataUnit.datetime)

    return (
      <tr key={uniqueId()}>
        <td>
          <p>
            <span className='weekday'>{weekday}</span>
            <br />
            <span className='datetime'>
              {day}
              {time && `, ${time}`}
            </span>
          </p>
        </td>
        <td>
          <p>{dataUnit.weather.description}</p>
        </td>
        <td>
          <img
            src={`https://www.weatherbit.io/static/img/icons/${dataUnit.weather.icon}.png`}
            alt={dataUnit.weather.icon}
          />
        </td>
        <td>
          <p>{Math.round(dataUnit.temp)}°</p>
        </td>
        <td>
          <p>{dataUnit.rh}%</p>
        </td>
        <td>
          <p>{dataUnit.wind_spd.toFixed(1)} m/s</p>
        </td>
      </tr>
    )
  })

export default SpotWeatherList
