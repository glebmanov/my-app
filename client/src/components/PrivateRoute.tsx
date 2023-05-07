import { useAppSelector } from 'hooks/useRedux'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface PrivateRouteProps {
  children: JSX.Element | Array<JSX.Element>
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation()
  const isAuth = useAppSelector(state => state.user.isAuth)

  if (isAuth) return <>{children}</>

  return <Navigate to='/login' state={{ from: location }} />
}

export default PrivateRoute
