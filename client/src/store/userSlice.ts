import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ky from 'ky'
import jwt_decode from 'jwt-decode'
import { AppState } from 'types/appInterfaces'

export const registration = createAsyncThunk<
  { token: string; message?: string; type: string },
  { name: string; email: string; password: string }
>('user/registration', async (data, { rejectWithValue }) => {
  const { name, email, password } = data

  try {
    return await ky
      .post('/api/auth/registration', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        json: { name, email, password },
      })
      .json()
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const login = createAsyncThunk<
  { token: string; message?: string; type: string },
  { email: string; password: string }
>('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await ky
      .post('/api/auth/login', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        json: { email, password },
      })
      .json()
  } catch (e) {
    const result = await e.response.json()
    return rejectWithValue(result)
  }
})

export const check = createAsyncThunk<{ token: string; message?: string; type: string }>(
  'user/check',
  async (_, { rejectWithValue }) => {
    try {
      return await ky
        .get('/api/auth/check', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .json()
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const getFavoriteCocktails = createAsyncThunk<number[]>('user/getFavoriteCocktails', async (_, thunkAPI) => {
  const { user } = thunkAPI.getState() as AppState
  return await ky.get('/api/favorite/cocktail', { searchParams: { userId: user.id } }).json()
})

export const addFavoriteCocktail = createAsyncThunk<number, { cocktailId: number }>(
  'user/addFavoriteCocktail',
  async ({ cocktailId }, thunkAPI) => {
    const { user } = thunkAPI.getState() as AppState
    return await ky.post('/api/favorite/cocktail', { json: { cocktailId, userId: user.id } }).json()
  },
)

export const deleteFavoriteCocktail = createAsyncThunk<number, { cocktailId: number }>(
  'user/deleteFavoriteCocktail',
  async ({ cocktailId }, thunkAPI) => {
    const { user } = thunkAPI.getState() as AppState
    return await ky.delete(`/api/favorite/cocktail`, { searchParams: { cocktailId, userId: user.id } }).json()
  },
)

export type UserState = {
  isAuth: boolean
  id: string
  name: string
  email: string
  role: string
  favoriteCocktails: Array<number>
  status: string
  error: string
}

const initialState: UserState = {
  isAuth: false,
  id: '',
  name: '',
  email: '',
  role: '',
  favoriteCocktails: [],
  status: '',
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser(state) {
      state.isAuth = false
      state.id = ''
      state.name = ''
      state.email = ''
      state.role = ''
      state.favoriteCocktails = []
      state.status = ''
      localStorage.removeItem('token')
    },
  },
  extraReducers: builder => {
    builder.addCase(registration.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(registration.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      const { token } = payload
      localStorage.setItem('token', token)
      state.isAuth = true
      const { id, name, email, role }: { id: string; name: string; email: string; role: string } = jwt_decode(token)
      state.id = id
      state.name = name
      state.email = email
      state.role = role
    })
    builder.addCase(registration.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
      state.isAuth = false
    })
    builder.addCase(login.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      const { token } = payload
      localStorage.setItem('token', token)
      state.isAuth = true
      const { id, name, email, role }: { id: string; name: string; email: string; role: string } = jwt_decode(token)
      state.id = id
      state.name = name
      state.email = email
      state.role = role
    })
    builder.addCase(login.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
      state.isAuth = false
    })
    builder.addCase(check.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(check.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      const { token } = payload
      localStorage.setItem('token', token)
      state.isAuth = true
      const { id, name, email, role }: { id: string; name: string; email: string; role: string } = jwt_decode(token)
      state.id = id
      state.name = name
      state.email = email
      state.role = role
    })
    builder.addCase(check.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
      state.isAuth = false
    })
    builder.addCase(getFavoriteCocktails.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(getFavoriteCocktails.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      state.favoriteCocktails = payload
    })
    builder.addCase(getFavoriteCocktails.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
    })
    builder.addCase(addFavoriteCocktail.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(addFavoriteCocktail.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      state.favoriteCocktails.push(payload)
    })
    builder.addCase(addFavoriteCocktail.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
    })
    builder.addCase(deleteFavoriteCocktail.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(deleteFavoriteCocktail.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      state.favoriteCocktails = state.favoriteCocktails.filter(id => id !== payload)
    })
    builder.addCase(deleteFavoriteCocktail.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
    })
  },
})

export const { removeUser } = userSlice.actions

export default userSlice.reducer
