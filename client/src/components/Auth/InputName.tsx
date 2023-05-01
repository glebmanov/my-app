import React from 'react'
import { useFormContext } from 'react-hook-form'

const InputName: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
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
      <div className='error'>{errors?.name && <p>{errors?.name?.message?.toString() || 'Error'}</p>}</div>
    </>
  )
}

export default InputName
