import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import ky from 'ky'
import { isWeekend } from 'utils/date'

export type DataUnit = {
  datetime: string
  weather: {
    description: string
    icon: string
  }
  temp: number
  rh: number
  wind_spd: number
}

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
  error: null | string
}

export const fetchSpots = createAsyncThunk<Spot[]>(
  'weather/fetchSpots',
  async () => await ky.get('/api/weather/spots').json(),
)

export const fetchSpotWeather = createAsyncThunk<
  { data: Array<DataUnit> },
  undefined,
  { state: { weather: WeatherState }; rejectValue: string }
>('weather/fetchSpotWeather', async (_, { getState, rejectWithValue }) => {
  const { weather } = getState()
  const { activeSpotId, endpoint, spots } = weather
  const foundLocation = spots.find(spot => spot.id === activeSpotId)?.location

  if (foundLocation) {
    const { lat, lon } = foundLocation
    return await ky.get('/api/weather', { searchParams: { endpoint, lat, lon } }).json()
  } else {
    return rejectWithValue('No found location')
  }
})

const initialState: WeatherState = {
  spots: [],
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
    setActiveSpotId(state, action: PayloadAction<number | null>) {
      state.data = []
      state.activeSpotId = action.payload
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSpotWeather.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchSpotWeather.fulfilled, (state, action) => {
        state.status = 'resolved'
        if (state.endpoint === 'forecast/daily') {
          state.data = action.payload.data.filter(dataUnit => isWeekend(dataUnit.datetime))
        } else {
          state.data = action.payload.data
        }
      })
      .addCase(fetchSpots.fulfilled, (state, action) => {
        state.status = 'resolved'
        state.spots = action.payload
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.status = 'rejected'
        state.activeSpotId = null
        state.error = action.payload
      })
  },
})

export const { setEndpoint, setActiveSpotId } = weatherSlice.actions

export default weatherSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}
