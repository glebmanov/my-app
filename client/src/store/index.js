import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './weatherSlice'

export default configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
