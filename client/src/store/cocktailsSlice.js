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

export const findOrCreateCocktail = createAsyncThunk(
  'cocktails/findOrCreateCocktail',
  async ({ name, amount, description, type, ingredients }) =>
    await axios.post('/api/cocktail', { name, amount, description, type, ingredients }),
)

export const getCocktails = createAsyncThunk(
  'cocktails/getCocktails',
  async ({ page, substring }) => await axios.get('/api/cocktail', { params: { page, substring } }),
)

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
    cocktail: { name: '', amount: [] },
    cocktails: {},
    searchedCocktails: { count: 0, rows: [] },
    filteredCocktails: { count: 0, rows: [] },
    ingredients: [],
    categories: [],
    error: null,
  },
  reducers: {
    clearFilteredCocktails(state, action) {
      state.filteredCocktails = { count: 0, rows: [] }
    },
    clearSearchedCocktailsCocktails(state, action) {
      state.searchedCocktails = { count: 0, rows: [] }
    },
  },
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
      state.ingredients.push(payload.data)
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
    [findOrCreateCocktail.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [findOrCreateCocktail.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      const { cocktails, action } = payload.data
      if (action === 'create') {
        state.cocktails = cocktails
      } else {
        state.filteredCocktails = cocktails
      }
    },
    [findOrCreateCocktail.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [getCocktails.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [getCocktails.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      const { cocktails, action } = payload.data
      if (action === 'searched') {
        state.searchedCocktails = cocktails
      } else {
        state.cocktails = cocktails
      }
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

export const { clearFilteredCocktails, clearSearchedCocktailsCocktails } = cocktailsSlice.actions

export default cocktailsSlice.reducer
