import React from 'react'
import { useForm } from 'react-hook-form'
import { uniqueId } from 'lodash'

const EditorCocktail = ({ ingredients }) => {
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
    <div className='editor-cocktail'>
      <h3>Add cocktail</h3>
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

        <label htmlFor='inputs-cocktail-ingredients'>Ingredients</label>
        <div id='inputs-cocktail-ingredients'>
          <div className='cocktail-ingredient'>
            <select {...register('ingredientId')}>
              {ingredients.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>

            <input
              className='amount-cocktail-ingredient'
              type='number'
              {...register('amount', {
                required: 'field is required',
                min: {
                  value: 1,
                  message: 'minimum value 1',
                },
              })}
            />

            <select className='ingredient-units' {...register('units')}>
              {['ml', 'dash'].map(unit => (
                <option key={uniqueId()} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='add-buttons'>
          <button type='button' className='btn btn-cstm ingredient-add'>
            +
          </button>

          <button type='submit' className='btn btn-cstm btn-add'>
            Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditorCocktail
