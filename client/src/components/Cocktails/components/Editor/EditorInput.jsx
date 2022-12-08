import React from 'react'

const EditorInput = ({ placeholder }) => {
  return (
    <div className='editor-input'>
      <input type='text' placeholder={placeholder} />
    </div>
  )
}

export default EditorInput
