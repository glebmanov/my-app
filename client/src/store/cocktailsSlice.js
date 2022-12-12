import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCategories = createAsyncThunk('cocktails/getCategories', async () => await axios.get('/api/category'))

export const createIngredient = createAsyncThunk(
  'cocktails/createIngredient',
  async ({ name, category_id }) => await axios.post('/api/ingredient', { name, category_id }),
)

export const getIngredients = createAsyncThunk(
  'cocktails/getIngredients',
  async () => await axios.get('/api/ingredient'),
)

export const createCocktail = createAsyncThunk(
  'cocktails/createCocktail',
  async ({ name, amount, description }) => await axios.post('/api/cocktail', { name, amount, description }),
)

export const getCocktails = createAsyncThunk('cocktails/getCocktails', async () => await axios.get('/api/cocktail'))

export const getOneCocktail = createAsyncThunk(
  'cocktails/getOneCocktail',
  async ({ id }) => await axios.get(`/api/cocktail/${id}`),
)

export const updateCocktail = createAsyncThunk(
  'cocktails/updateCocktail',
  async ({ id, name, amount, description }) => await axios.put('/api/cocktail', { id, name, amount, description }),
)

export const deleteCocktail = createAsyncThunk(
  'cocktails/deleteCocktail',
  async ({ id }) => await axios.delete(`/api/cocktail/${id}`),
)

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState: {
    cocktail: { name: '' },
    cocktails: [],
    ingredients: [],
    categories: [],
    error: null,
  },
  reducers: {},
  extraReducers: {
    [getCategories.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.categories = payload.data
    },
    [getCategories.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [createIngredient.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [createIngredient.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.ingredient.push(payload.data)
    },
    [createIngredient.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [getIngredients.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [getIngredients.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.ingredients = payload.data
    },
    [getIngredients.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [createCocktail.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [createCocktail.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.cocktails.push(payload.data)
    },
    [createCocktail.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [getCocktails.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [getCocktails.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.cocktails = payload.data
    },
    [getCocktails.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [getOneCocktail.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [getOneCocktail.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.cocktail = payload.data
    },
    [getOneCocktail.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
  },
})

export const {} = cocktailsSlice.actions

export default cocktailsSlice.reducer
