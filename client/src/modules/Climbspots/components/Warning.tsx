import React from 'react'

interface WarningProps {
  error: string
}

const Warning: React.FC<WarningProps> = ({ error }) => {
  return (
    <div className='warning d-flex flex-column p-2 p-md-4 rounded'>
      <p className='m-auto'>{error}</p>
    </div>
  )
}

export default Warning
