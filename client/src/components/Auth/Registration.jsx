import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

const Registration = () => {
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
    <div className='container-auth'>
      <div className='registration'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Username
            <input
              type='text'
              {...register('name', {
                required: 'field is required',
                minLength: {
                  value: 6,
                  message: 'minimum length 6 characters',
                },
              })}
            />
          </label>
          <div className='error'>{errors?.name && <p>{errors?.name?.message || 'Error'}</p>}</div>

          <label>
            Email
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
          <div className='error'>{errors?.email && <p>{errors?.email?.message || 'Error'}</p>}</div>

          <label>
            Password
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
          <div className='error'>{errors?.password && <p>{errors?.password?.message || 'Error'}</p>}</div>

          <div className='auth-buttons'>
            <button type='submit' className='btn btn-cstm btn-sign-in'>
              Sign up
            </button>
            <Link to='/login'>
              <button className='btn-sign-up'>Sign in</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration
