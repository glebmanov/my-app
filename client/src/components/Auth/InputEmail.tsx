import React from 'react'
import { useFormContext } from 'react-hook-form'

const InputEmail: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <label>
        <span>Email</span>
        <input
          type='email'
          {...register('email', {
            required: 'field is required',
            pattern: {
              value: /.+@.+..+/i,
              message: 'incorrect email',
            },
          })}
        />
      </label>
      <div className='error'>{errors?.email && <p>{errors?.email?.message?.toString() || 'Error'}</p>}</div>
    </>
  )
}

export default InputEmail
