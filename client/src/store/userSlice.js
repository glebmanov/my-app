import { createSlice, createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export const registration = createAsyncThunk(
  'user/registration',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      return await axios.post('/api/auth/registration', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        name,
        email,
        password,
      })
    } catch (e) {
      return rejectWithValue(e.response.data)
    }
  },
)

export const login = createAsyncThunk('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    return await axios.post('/api/auth/login', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      email,
      password,
    })
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const check = createAsyncThunk('user/check', async (_, { rejectWithValue }) => {
  try {
    return await axios.get('/api/auth/check', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  } catch (e) {
    return rejectWithValue(e.response.data)
  }
})

export const getFavoriteCocktails = createAsyncThunk('user/getFavoriteCocktails', async (_, { getState }) => {
  const { user } = getState()
  return await axios.get('/api/favorite/cocktail', { params: { userId: user.id } })
})

export const addFavoriteCocktail = createAsyncThunk(
  'user/addFavoriteCocktail',
  async ({ cocktailId }, { getState }) => {
    const { user } = getState()
    return await axios.post('/api/favorite/cocktail', { cocktailId, userId: user.id })
  },
)

export const deleteFavoriteCocktail = createAsyncThunk(
  'user/deleteFavoriteCocktail',
  async ({ cocktailId }, { getState }) => {
    const { user } = getState()
    return await axios.delete(`/api/favorite/cocktail`, { params: { cocktailId, userId: user.id } })
  },
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuth: false,
    id: null,
    name: null,
    email: null,
    role: null,
    favoriteCocktails: [],
    status: null,
  },
  reducers: {
    setIsAuth(state, { payload }) {
      state.isAuth = payload.data
    },
    removeUser(state) {
      state.isAuth = false
      state.id = null
      state.name = null
      state.email = null
      state.role = null
      state.favoriteCocktails = []
      state.status = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: {
    [registration.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [registration.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      const { token } = payload.data
      localStorage.setItem('token', token)
      state.isAuth = true
      const { id, name, email, role } = jwt_decode(token)
      state.id = id
      state.name = name
      state.email = email
      state.role = role
    },
    [registration.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
      state.isAuth = false
    },
    [login.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [login.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      const { token } = payload.data
      localStorage.setItem('token', token)
      state.isAuth = true
      const { id, name, email, role } = jwt_decode(token)
      state.id = id
      state.name = name
      state.email = email
      state.role = role
    },
    [login.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
      state.isAuth = false
    },
    [check.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [check.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      const { token } = payload.data
      localStorage.setItem('token', token)
      state.isAuth = true
      const { id, name, email, role } = jwt_decode(token)
      state.id = id
      state.name = name
      state.email = email
      state.role = role
    },
    [check.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
      state.isAuth = false
    },
    [getFavoriteCocktails.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [getFavoriteCocktails.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.favoriteCocktails = payload.data
    },
    [getFavoriteCocktails.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [addFavoriteCocktail.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [addFavoriteCocktail.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.favoriteCocktails.push(payload.data)
    },
    [addFavoriteCocktail.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [deleteFavoriteCocktail.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [deleteFavoriteCocktail.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.favoriteCocktails = state.favoriteCocktails.filter(id => id !== payload.data)
    },
    [deleteFavoriteCocktail.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
  },
})

export const { setIsAuth, removeUser } = userSlice.actions

export default userSlice.reducer
