import React from 'react'

const Auth = () => {
  return (
    <div className='container-auth'>
      <div className='auth'>
        <input type='email' placeholder='Email' />
        <input type='text' placeholder='Nikname' />
        <input type='password' placeholder='Password' />
        <div className='auth-buttons'>
          <button className='btn btn-cstm btn-sign-in'>Sign in</button>
          <button className='btn-sign-up'>Sign up</button>
        </div>
      </div>
    </div>
  )
}

export default Auth
