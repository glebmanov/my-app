import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import weatherReducer from './weatherSlice'
import cocktailsReducer from './cocktailsSlice'

export default configureStore({
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
