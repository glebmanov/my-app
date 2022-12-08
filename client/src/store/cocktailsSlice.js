import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchCategories = createAsyncThunk('cocktails/fetchCategory', async () => await axios.get('/api/category'))
export const fetchCocktails = createAsyncThunk('cocktails/fetchCocktails', async () => await axios.get('/api/cocktail'))
export const fetchIngredients = createAsyncThunk(
  'cocktails/fetchIngredients',
  async () => await axios.get('/api/ingredient'),
)
export const addIngredient = createAsyncThunk(
  'cocktails/addIngredient',
  async (name, categiry_id) => await axios.get('/api/ingredient', { body: { name, categiry_id } }),
)

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState: {
    cocktails: [],
    ingredients: [],
    selectedIngredients: [],
    categories: [],
    error: null,
  },
  reducers: {
    setSelectedIngredients(state, action) {
      state.selectedIngredients = action.payload.selectedIngredients
    },
  },
  extraReducers: {
    [fetchCategories.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [fetchCategories.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.categories = payload.data
    },
    [fetchCategories.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [fetchCocktails.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [fetchCocktails.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.cocktails = payload.data
    },
    [fetchCocktails.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [fetchIngredients.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [fetchIngredients.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.ingredients = payload.data
    },
    [fetchIngredients.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
  },
})

export const { setSelectedIngredients } = cocktailsSlice.actions

export default cocktailsSlice.reducer
