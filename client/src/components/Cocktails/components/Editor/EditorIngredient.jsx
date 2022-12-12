import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createIngredient } from 'store/cocktailsSlice'

const EditorIngredient = ({ categories }) => {
  const dispatch = useDispatch()

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

  return (
    <div className='editor-ingredient'>
      <h3>Create ingredient</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Name
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
          Category
          <select {...register('category_id')}>
            {categories.map(({ id, name }) => (
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
