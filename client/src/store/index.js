import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './weatherSlice'
import cocktailsReducer from './cocktailsSlice'

export default configureStore({
  reducer: {
    weather: weatherReducer,
    cocktails: cocktailsReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
