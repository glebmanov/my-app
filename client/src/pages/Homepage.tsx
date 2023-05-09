import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ScrollReveal from 'scrollreveal'

const Homepage: React.FC = () => {
  const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true,
  })

  useEffect(() => {
    sr.reveal('.projects', { delay: 300, origin: 'top' })
    sr.reveal('.icons', { delay: 450, origin: 'left' })
  }, [])

  return (
    <div className='homepage'>
      <section>
        <div className='projects'>
          <NavLink to='/climbspots'>Climbspots</NavLink>
          <NavLink to='/cocktails'>Cocktails</NavLink>
        </div>
      </section>

      <div className='icons'>
        <a href='https://github.com/glebmanov' target='_blank'>
          <i className='ri-github-fill'></i>
        </a>
        <a href='https://www.linkedin.com/in/gleb-manov-124109162/' target='_blank'>
          <i className='ri-linkedin-box-fill'></i>
        </a>
        <a href='https://www.instagram.com/glebmanov/' target='_blank'>
          <i className='ri-instagram-line'></i>
        </a>
        <a href='https://discordapp.com/users/396604548006805516/' target='_blank'>
          <i className='ri-discord-fill'></i>
        </a>
      </div>
    </div>
  )
}

export default Homepage
