import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'store/userSlice'
import weatherReducer from 'store/weatherSlice'
import cocktailsReducer from 'store/cocktailsSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    weather: weatherReducer,
    cocktails: cocktailsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
