import React from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/index'
import { registration } from 'store/userSlice'
import InputName from './InputName'
import InputEmail from './InputEmail'
import InputPassword from './InputPassword'

type FormValues = {
  name: string
  email: string
  password: string
}

const Registration: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const methods = useForm<FormValues>({
    mode: 'onBlur',
  })

  const { setError, handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(registration(data))
      .unwrap()
      .then(() => {
        reset()
        navigate('/', { replace: true })
      })
      .catch(e => {
        const type = e.type === 'email' || e.type === 'password' || e.type === 'name' ? e.type : 'email'
        setError(type, { message: e.message })
      })
  }

  return (
    <div className='container-auth'>
      <h1>Registration</h1>
      <div className='registration'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputName />

            <InputEmail />

            <InputPassword />

            <div className='auth-buttons'>
              <button type='submit' className='btn btn-cstm btn-sign-in'>
                Sign up
              </button>
              <Link to='/login'>
                <button className='btn-sign-up'>Sign in</button>
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Registration
