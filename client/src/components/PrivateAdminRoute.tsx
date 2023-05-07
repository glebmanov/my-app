import { useAppSelector } from 'hooks/useRedux'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface PrivateAdminRouteProps {
  children: JSX.Element | Array<JSX.Element>
}

const PrivateAdminRoute: React.FC<PrivateAdminRouteProps> = ({ children }) => {
  const location = useLocation()
  const role = useAppSelector(state => state.user.role)

  if (role === 'admin') return <>{children}</>

  return <Navigate to='/' state={{ from: location }} />
}

export default PrivateAdminRoute
