import React from 'react'
import { useForm } from 'react-hook-form'
import { uniqueId } from 'lodash'

const EditorIngredient = ({ categories }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const onSubmit = data => {
    alert(JSON.stringify(data))
    reset()
  }

  return (
    <div className='editor-ingredient'>
      <h3>Add ingredient</h3>
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
          <select {...register('category')}>
            {categories.map((category, index) => (
              <option key={uniqueId()} value={index}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <div className='add-buttons'>
          <button type='submit' className='btn btn-cstm btn-add'>
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditorIngredient
