import React from 'react'
import { useFormContext } from 'react-hook-form'

const InputPassword: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <label>
        <span>Password</span>
        <input
          type='password'
          {...register('password', {
            required: 'field is required',
            minLength: {
              value: 6,
              message: 'minimum length 6 characters',
            },
          })}
        />
      </label>
      <div className='error'>{errors?.password && <p>{errors?.password?.message?.toString() || 'Error'}</p>}</div>
    </>
  )
}

export default InputPassword
