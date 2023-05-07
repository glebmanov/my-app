import React, { useEffect } from 'react'
import ScrollReveal from 'scrollreveal'

const Homepage: React.FC = () => {
  const sr = ScrollReveal({
    distance: '65px',
    duration: 2600,
    delay: 450,
    reset: true,
  })

  useEffect(() => {
    sr.reveal('.icons', { delay: 400, origin: 'top' })
  }, [])

  return (
    <div className='homepage'>
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
