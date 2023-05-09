import React from 'react'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'hooks/index'
import { login } from 'store/userSlice'
import InputEmail from './InputEmail'
import InputPassword from './InputPassword'

type FormValues = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const methods = useForm<FormValues>({
    mode: 'onBlur',
  })

  const { setError, handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<FormValues> = data => {
    dispatch(login(data))
      .unwrap()
      .then(() => {
        reset()
        navigate('/', { replace: true })
      })
      .catch(e => {
        const type = e.type === 'email' || e.type === 'password' ? e.type : 'email'
        setError(type, { message: e.message })
      })
  }

  return (
    <div className='container-auth'>
      <h1>Login</h1>
      <div className='login'>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputEmail />

            <InputPassword />

            <div className='auth-buttons'>
              <button type='submit' className='btn btn-cstm btn-sign-in'>
                Sign in
              </button>
              {/* <Link to='/registration'>
                <button className='btn-sign-up'>Sign up</button>
              </Link> */}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Login
