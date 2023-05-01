import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { removeUser } from 'store/userSlice'

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(state => state.user.isAuth)

  return (
    <nav>
      <Link to='climbspots'>
        <span>Climbspots</span>
      </Link>
      <Link to='cocktails'>
        <span>Cocktails</span>
      </Link>
      {isAuth ? (
        <Link to='/' onClick={() => dispatch(removeUser())}>
          <span>Sign out</span>
        </Link>
      ) : (
        <Link to='login'>
          <span>Sign in</span>
        </Link>
      )}
    </nav>
  )
}

export default Navigation
