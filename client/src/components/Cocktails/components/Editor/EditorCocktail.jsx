import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredients, getCocktailCategories, findOrCreateCocktail } from 'store/cocktailsSlice'
import { uniqueId, capitalize } from 'lodash'

const EditorCocktail = () => {
  const dispatch = useDispatch()
  const ingredients = useSelector(state => state.cocktails.ingredients)
  const cocktailCategories = useSelector(state => state.cocktails.cocktailCategories)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      amount: [{ ingredientId: '', value: '', unit: 'ml' }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'amount',
  })

  const onSubmit = data => {
    data.name = capitalize(data.name)
    dispatch(findOrCreateCocktail(data))
    reset()
  }

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getCocktailCategories())
  }, [dispatch])

  return (
    <div className='editor-cocktail'>
      <h3>Create cocktail</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <span>Name</span>
          <input
            type='text'
            {...register('name', {
              required: 'field is required',
              minLength: {
                value: 3,
                message: 'minimum length 3 characters',
              },
            })}
          />
        </label>
        <div className='error'>{errors?.name && <p>{errors?.name?.message || 'Error'}</p>}</div>

        <label>
          <span>Category</span>
          <select {...register('category_cocktail_name_id')}>
            {cocktailCategories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>Description</span>
          <textarea
            {...register('description', {
              maxLength: {
                value: 255,
                message: 'maximum length 255 characters',
              },
            })}
          />
        </label>
        <div className='error'>{errors?.description && <p>{errors?.description?.message || 'Error'}</p>}</div>

        <label htmlFor='inputs-cocktail-ingredients'>
          <span>Ingredients</span>
        </label>
        <div id='inputs-cocktail-ingredients'>
          <ul className='cocktail-ingredient'>
            {fields.map((item, index) => (
              <li key={item.id}>
                <select
                  {...register(`amount.${index}.ingredientId`, {
                    required: 'field is required',
                  })}
                >
                  {ingredients.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>

                <input
                  className='amount-cocktail-ingredient'
                  type='number'
                  {...register(`amount.${index}.value`, {
                    required: 'field is required',
                    min: {
                      value: 1,
                      message: 'minimum value 1',
                    },
                  })}
                />

                <select className='ingredient-units' {...register(`amount.${index}.unit`)}>
                  {['ml', 'dash'].map(unit => (
                    <option key={uniqueId()} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>

                <button type='button' className='btn btn-cstm ingredient-remove' onClick={() => remove(index)}>
                  -
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className='add-buttons'>
          <button
            type='button'
            className='btn btn-cstm ingredient-add'
            onClick={() => append({ ingredientId: '', value: '', unit: 'ml' })}
          >
            +
          </button>

          <button type='submit' className='btn btn-cstm btn-add'>
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditorCocktail
