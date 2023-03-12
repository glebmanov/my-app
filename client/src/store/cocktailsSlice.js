import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getIngredientCategories = createAsyncThunk(
  'cocktails/getIngredientCategories',
  async () => await axios.get('/api/category/ingredient'),
)

export const getCocktailCategories = createAsyncThunk(
  'cocktails/getCocktailCategories',
  async () => await axios.get('/api/category/cocktail'),
)

export const createIngredient = createAsyncThunk(
  'cocktails/createIngredient',
  async ({ name, category_ingredient_name_id }) =>
    await axios.post('/api/ingredient', { name, category_ingredient_name_id }),
)

export const getIngredients = createAsyncThunk(
  'cocktails/getIngredients',
  async () => await axios.get('/api/ingredient'),
)

export const findOrCreateCocktail = createAsyncThunk(
  'cocktails/findOrCreateCocktail',
  async ({ name, amount, category_cocktail_name_id, description, type, ingredients, cocktails }) =>
    await axios.post('/api/cocktail', {
      name,
      amount,
      category_cocktail_name_id,
      description,
      type,
      ingredients,
      cocktails,
    }),
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
    page: 1,
    cocktails: {},
    searchedCocktails: { count: 0, rows: [] },
    filteredCocktails: { count: 0, rows: [] },
    favoriteCocktails: { count: 0, rows: [] },
    ingredients: [],
    ingredientCategories: [],
    cocktailCategories: [],
    status: null,
    error: null,
  },
  reducers: {
    clearFilteredCocktails(state) {
      state.filteredCocktails = { count: 0, rows: [] }
    },
    clearSearchedCocktails(state) {
      state.searchedCocktails = { count: 0, rows: [] }
    },
    clearFavoriteCocktails(state) {
      state.favoriteCocktails = { count: 0, rows: [] }
    },
    setPage(state, { payload }) {
      state.page = payload.page
    },
  },
  extraReducers: {
    [getIngredientCategories.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [getIngredientCategories.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.ingredientCategories = payload.data
    },
    [getIngredientCategories.rejected]: (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message
    },
    [getCocktailCategories.pending]: state => {
      state.status = 'loading'
      state.error = null
    },
    [getCocktailCategories.fulfilled]: (state, { payload }) => {
      state.status = 'resolved'
      state.cocktailCategories = payload.data
    },
    [getCocktailCategories.rejected]: (state, { error }) => {
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
      if (action === 'create') state.cocktails.rows.push(...cocktails)
      if (action === 'find') state.filteredCocktails.rows = cocktails
      if (action === 'get') state.favoriteCocktails.rows = cocktails
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
  },
})

export const { clearFilteredCocktails, clearSearchedCocktails, clearFavoriteCocktails, setPage } =
  cocktailsSlice.actions

export default cocktailsSlice.reducer
