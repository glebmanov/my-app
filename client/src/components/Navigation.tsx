import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/index'
import { removeUser } from 'store/userSlice'

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.user)
  const notInitialRender = useRef(false)
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(prev => !prev)

  useEffect(() => {
    if (notInitialRender.current) {
      const menu = document.querySelector('#menu-icon')
      const nav = document.querySelector('nav')
      menu?.classList.toggle('bx-x')
      nav?.classList.toggle('open')
    } else {
      notInitialRender.current = true
    }
  }, [isOpen])

  return (
    <>
      <nav>
        <NavLink to='climbspots'>Climbspots</NavLink>
        <NavLink to='cocktails'>Cocktails</NavLink>
        {isAuth ? <a onClick={() => dispatch(removeUser())}>Sign out</a> : <NavLink to='login'>Sign in</NavLink>}
      </nav>
      <div className='bx bx-menu' id='menu-icon' onClick={toggle} />
    </>
  )
}

export default Navigation
