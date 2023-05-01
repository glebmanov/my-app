import { CocktailsState } from 'store/cocktailsSlice'
import { UserState } from 'store/userSlice'
import { WeatherState } from 'store/weatherSlice'

export interface AppState {
  user: UserState
  weather: WeatherState
  cocktails: CocktailsState
}
