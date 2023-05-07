import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import ky from 'ky'
import { Amount, Cocktail, CocktailCategory, Ingredient, IngredientCategory } from 'types/cocktailsInterfaces'

type ResponseCocktails = { count: number; rows: Array<Cocktail> }

export const getIngredientCategories = createAsyncThunk<IngredientCategory[]>(
  'cocktails/getIngredientCategories',
  async () => await ky.get('/api/category/ingredient').json(),
)

export const getCocktailCategories = createAsyncThunk<CocktailCategory[]>(
  'cocktails/getCocktailCategories',
  async () => await ky.get('/api/category/cocktail').json(),
)

export const createIngredient = createAsyncThunk<Ingredient, { name: string; category_ingredient_name_id: string }>(
  'cocktails/createIngredient',
  async data => {
    const { name, category_ingredient_name_id } = data
    return await ky.post('/api/ingredient', { json: { name, category_ingredient_name_id } }).json()
  },
)

export const getIngredients = createAsyncThunk<Ingredient[]>(
  'cocktails/getIngredients',
  async () => await ky.get('/api/ingredient').json(),
)

export const createCocktail = createAsyncThunk<
  Cocktail,
  {
    name?: string
    amount?: Array<Amount>
    category_cocktail_name_id?: string
    description?: string
  }
>('cocktails/createCocktail', async data => {
  const { name, amount, category_cocktail_name_id, description } = data
  return await ky
    .post('/api/cocktail', {
      json: {
        name,
        amount,
        category_cocktail_name_id,
        description,
      },
    })
    .json()
})

export const getCocktails = createAsyncThunk<
  { cocktails: ResponseCocktails; destination: string },
  { page?: number; substring?: string; type?: string; ingredients?: Array<number>; cocktails?: Array<number> }
>('cocktails/getCocktails', async data => {
  const { page, substring, type, ingredients, cocktails } = data
  return await ky
    .get('/api/cocktail', {
      searchParams: {
        ...(page && { page }),
        ...(substring && { substring }),
        ...(type && { type }),
        ...(ingredients && { ingredients: ingredients.join('') }),
        ...(cocktails && { cocktails: cocktails.join('') }),
      },
    })
    .json()
})

export const updateCocktail = createAsyncThunk<
  Cocktail,
  { id: number; name: string; amount: Array<Amount>; description: string }
>('cocktails/updateCocktail', async data => {
  const { id, name, amount, description } = data
  return await ky.put('/api/cocktail', { json: { id, name, amount, description } }).json()
})

export const deleteCocktail = createAsyncThunk<string, { id: number }>('cocktails/deleteCocktail', async data => {
  const { id } = data
  return await ky.delete(`/api/cocktail/${id}`).json()
})

export type CocktailsState = {
  page: number
  cocktails: {
    count: number
    rows: Array<Cocktail>
  }
  searchedCocktails: {
    count: number
    rows: Array<Cocktail>
  }
  filteredCocktails: {
    count: number
    rows: Array<Cocktail>
  }
  favoriteCocktails: {
    count: number
    rows: Array<Cocktail>
  }
  ingredients: Array<Ingredient>
  ingredientCategories: Array<IngredientCategory>
  cocktailCategories: Array<CocktailCategory>
  status: string
  error: string
}

const initialState: CocktailsState = {
  page: 1,
  cocktails: { count: 0, rows: [] },
  searchedCocktails: { count: 0, rows: [] },
  filteredCocktails: { count: 0, rows: [] },
  favoriteCocktails: { count: 0, rows: [] },
  ingredients: [],
  ingredientCategories: [],
  cocktailCategories: [],
  status: '',
  error: '',
}

const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
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
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getIngredientCategories.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(getIngredientCategories.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      state.ingredientCategories = payload
    })
    builder.addCase(getIngredientCategories.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
    })
    builder.addCase(getCocktailCategories.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(getCocktailCategories.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      state.cocktailCategories = payload
    })
    builder.addCase(getCocktailCategories.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
    })
    builder.addCase(createIngredient.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(createIngredient.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      state.ingredients.push(payload)
    })
    builder.addCase(createIngredient.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
    })
    builder.addCase(getIngredients.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(getIngredients.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      state.ingredients = payload
    })
    builder.addCase(getIngredients.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
    })
    builder.addCase(createCocktail.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(createCocktail.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      state.cocktails.rows.push(payload)
    })
    builder.addCase(createCocktail.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
    })
    builder.addCase(getCocktails.pending, state => {
      state.status = 'loading'
      state.error = ''
    })
    builder.addCase(getCocktails.fulfilled, (state, { payload }) => {
      state.status = 'resolved'
      const { destination, cocktails } = payload
      switch (destination) {
        case 'byIngredients':
          state.filteredCocktails = cocktails
          break
        case 'bySubstring':
          state.searchedCocktails = cocktails
          break
        case 'byFavorites':
          state.favoriteCocktails = cocktails
          break
        default:
          state.cocktails = cocktails
          break
      }
    })
    builder.addCase(getCocktails.rejected, (state, { error }) => {
      state.status = 'rejected'
      state.error = error.message!
    })
  },
})

export const { clearFilteredCocktails, clearSearchedCocktails, clearFavoriteCocktails, setPage } =
  cocktailsSlice.actions

export default cocktailsSlice.reducer
