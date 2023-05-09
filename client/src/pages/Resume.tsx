import React from 'react'

const skills = ['VanillaJS', 'Typescript', 'React', 'NodeJS']

const Resume: React.FC = () => {
  return (
    <div className='resume'>
      <div className='resume-block'>
        <h1>Summary</h1>
        <a href='https://spb.hh.ru/resume/866193beff09d213400039ed1f5861764f464f' target='_blank'>
          spb.hh
        </a>
      </div>
      <div className='resume-block'>
        <h1>Skills</h1>
        <div className='skills'>
          {skills.map(skill => (
            <div className='skill'>{skill}</div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Resume
