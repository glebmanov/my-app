export interface Cocktail {
  id: number
  name: string
  description: string
  category_cocktail_name_id: number
  img: string
}

export interface CocktailCategory {
  id: number
  name: string
  cocktails: Array<number>
}

export interface Ingredient {
  id: number
  name: string
  category_ingredient_name_id: number
}

export interface IngredientCategory {
  id: number
  name: string
  ingredients: Array<number>
}

export interface Amount {
  id?: number
  ingredientId: number | string
  value: string
  unit: string
}
