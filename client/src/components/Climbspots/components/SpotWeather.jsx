import React from 'react'
import { useSelector } from 'react-redux'

import Endpoints from './Endpoints'
import SpotWeatherList from './SpotWeatherList'

const SpotWeather = () => {
  const data = useSelector(state => state.weather.data)
  const status = useSelector(state => state.weather.status)

  return (
    <div className='weather d-flex flex-column p-2 p-md-4 rounded'>
      {status !== 'loading' ? (
        data.length !== 0 ? (
          <>
            <Endpoints />
            <div className='pt-lg-4 pt-md-3 pt-2'>
              <table className='table table-light table-borderless table-striped m-0 text-center align-middle'>
                <thead>
                  <tr>
                    <td>
                      <p>Datetime</p>
                    </td>
                    <td>
                      <p>Description</p>
                    </td>
                    <td>
                      <p></p>
                    </td>
                    <td>
                      <p>T</p>
                    </td>
                    <td>
                      <p>H</p>
                    </td>
                    <td>
                      <p>W</p>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <SpotWeatherList data={data} />
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className='select-spot m-auto'>Select spot</div>
        )
      ) : (
        <div className='spinner-grow text-primary m-auto' role='status'></div>
      )}
    </div>
  )
}

export default SpotWeather
