import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createCocktail } from 'store/cocktailsSlice'
import { uniqueId } from 'lodash'

const EditorCocktail = ({ ingredients }) => {
  const dispatch = useDispatch()

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
    dispatch(createCocktail(data))
    reset()
  }

  return (
    <div className='editor-cocktail'>
      <h3>Create cocktail</h3>
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
          <ul className='cocktail-ingredient'>
            {fields.map((item, index) => (
              <li key={item.id}>
                <select {...register(`amount.${index}.ingredientId`)}>
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
