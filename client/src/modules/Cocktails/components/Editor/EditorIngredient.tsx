import React, { useEffect } from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { createIngredient } from 'store/cocktailsSlice'
import { getIngredientCategories } from 'store/cocktailsSlice'
import InputName from 'components/Auth/InputName'
import SelectCategory from './SelectCategory'

type FormValues = {
  name: string
  category_ingredient_name_id: string
}

const EditorIngredient: React.FC = () => {
  const dispatch = useAppDispatch()
  const ingredientCategories = useAppSelector(state => state.cocktails.ingredientCategories)

  const methods = useForm<FormValues>({ mode: 'onBlur' })

  const { handleSubmit, reset } = methods

  useEffect(() => {
    dispatch(getIngredientCategories())
  }, [])

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(createIngredient(data))
    reset()
  }

  return (
    <div className='editor-ingredient'>
      <h3>Create ingredient</h3>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputName />

          <SelectCategory categories={ingredientCategories} keyProp={'category_ingredient_name_id'} />

          <div className='add-buttons'>
            <button type='submit' className='btn btn-cstm btn-add'>
              create
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default EditorIngredient
