import React, { useEffect } from 'react'
import { useForm, FormProvider, useFieldArray, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { getIngredients, getCocktailCategories, createCocktail } from 'store/cocktailsSlice'
import { uniqueId, capitalize } from 'lodash'
import InputName from 'components/Auth/InputName'
import SelectCategory from './SelectCategory'
import TextareaDescription from './TextareaDescription'
import { Amount } from 'types/cocktailsInterfaces'

type FormValues = {
  name: string
  category_cocktail_name_id: string
  description: string
  amount: Array<Amount>
  ingredients: Array<string>
}

const EditorCocktail: React.FC = () => {
  const dispatch = useAppDispatch()
  const ingredients = useAppSelector(state => state.cocktails.ingredients)
  const cocktailCategories = useAppSelector(state => state.cocktails.cocktailCategories)

  const methods = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      amount: [{ ingredientId: '', value: '', unit: 'ml' }],
    },
  })

  const { register, control, handleSubmit, reset } = methods

  const { fields, append, remove } = useFieldArray({ control, name: 'amount' })

  const onSubmit: SubmitHandler<FormValues> = data => {
    data.name = capitalize(data.name)
    dispatch(createCocktail(data))
    reset()
  }

  useEffect(() => {
    dispatch(getIngredients())
    dispatch(getCocktailCategories())
  }, [])

  return (
    <div className='editor-cocktail'>
      <h3>Create cocktail</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputName />

          <SelectCategory categories={cocktailCategories} keyProp={'category_cocktail_name_id'} />

          <TextareaDescription />

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
      </FormProvider>
    </div>
  )
}

export default EditorCocktail
