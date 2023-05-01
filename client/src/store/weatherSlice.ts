import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import ky from 'ky'
import { isWeekend } from 'utils/date'
import { AppState } from 'types/appInterfaces'

export const fetchSpotWeather = createAsyncThunk('weather/fetchSpotWeather', async (_, thunkAPI) => {
  const { weather } = thunkAPI.getState() as AppState
  const { activeSpotId, endpoint, spots } = weather
  const foundLocation = spots.find(spot => spot.id === activeSpotId)?.location

  if (foundLocation) {
    const { lat, lon } = foundLocation
    return await ky.get('/api/weather', { searchParams: { endpoint, lat, lon } }).json()
  }
})

type Spot = {
  id: number
  name: string
  location: {
    lat: number
    lon: number
  }
}

export type WeatherState = {
  spots: Array<Spot>
  endpoint: string
  activeSpotId: null | number
  data: Array<any>
  status: null | string
  error: null | string | undefined
}

const initialState: WeatherState = {
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
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setEndpoint(state, action: PayloadAction<string>) {
      state.endpoint = action.payload
    },
    setActiveSpotId(state, action: PayloadAction<number>) {
      state.activeSpotId = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSpotWeather.pending, state => {
      state.status = 'loading'
      state.error = null
    })
    builder.addCase(fetchSpotWeather.fulfilled, (state, action: PayloadAction<any>) => {
      state.status = 'resolved'
      if (state.endpoint === 'forecast/daily') {
        state.data = action.payload.data.filter((dataUnit: any) => isWeekend(dataUnit.datetime))
      } else {
        state.data = action.payload.data
      }
    })
    builder.addCase(fetchSpotWeather.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.activeSpotId = null
      state.error = error.message
    })
  },
})

export const { setEndpoint, setActiveSpotId } = weatherSlice.actions

export default weatherSlice.reducer
