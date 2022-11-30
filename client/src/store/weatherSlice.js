import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { isWeekend } from '../utils/date'

export const fetchSpotWeather = createAsyncThunk('weather/fetchSpotWeather', async (_, { getState }) => {
  const { weather } = getState()
  const { activeSpotId, endpoint } = weather
  const { lat, lon } = weather.spots.find(spot => spot.id === activeSpotId).location
  return await axios.get('/api/weather', { params: { endpoint, lat, lon } })
})

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    spots: [
      { id: 1, name: 'Stalker', location: { lat: 60.750224, lon: 28.794119 } },
      { id: 2, name: 'Tundra', location: { lat: 60.755066, lon: 29.12039 } },
      { id: 3, name: 'Triangular', location: { lat: 61.109737, lon: 29.163144 } },
      { id: 4, name: 'Palcevo', location: { lat: 60.789368, lon: 28.809041 } },
      { id: 5, name: 'Bobrinii', location: { lat: 60.8411, lon: 28.85792 } },
      { id: 6, name: 'Yastrebinoe', location: { lat: 61.157183, lon: 29.707478 } },
      { id: 7, name: 'Hiitola', location: { lat: 61.222307, lon: 29.797216 } },
      { id: 8, name: 'Sorola', location: { lat: 61.481022, lon: 30.217573 } },
    ],
    endpoint: 'forecast/daily',
    activeSpotId: null,
    data: [],
    status: null,
    error: null,
  },
  reducers: {
    setEndpoint(state, action) {
      state.endpoint = action.payload.endpoint
    },
    setActiveSpotId(state, action) {
      state.activeSpotId = action.payload.activeSpotId
    },
  },
  extraReducers: {
    [fetchSpotWeather.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [fetchSpotWeather.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      if (state.endpoint === 'forecast/daily') {
        console.log('payload.data', payload.data)
        state.data = payload.data.data.filter(dataUnit => isWeekend(dataUnit.datetime))
      } else {
        state.data = payload.data.data
      }
    },
    [fetchSpotWeather.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.activeSpotId = null
      state.error = error.message
    },
  },
})

export const { setEndpoint, setActiveSpotId } = weatherSlice.actions

export default weatherSlice.reducer
