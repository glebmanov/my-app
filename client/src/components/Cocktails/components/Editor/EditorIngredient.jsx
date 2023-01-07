import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredient } from 'store/cocktailsSlice'
import { getIngredientCategories } from 'store/cocktailsSlice'

const EditorIngredient = () => {
  const dispatch = useDispatch()
  const ingredientCategories = useSelector(state => state.cocktails.ingredientCategories)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = data => {
    dispatch(createIngredient(data))
    reset()
  }

  useEffect(() => {
    dispatch(getIngredientCategories())
  }, [dispatch])

  return (
    <div className='editor-ingredient'>
      <h3>Create ingredient</h3>
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
          <select {...register('category_ingredient_name_id')}>
            {ingredientCategories.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </label>

        <div className='add-buttons'>
          <button type='submit' className='btn btn-cstm btn-add'>
            create
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditorIngredient
