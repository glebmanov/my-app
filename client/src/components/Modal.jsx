import React from 'react'

const Modal = ({ active, setActive, children }) => {
  return (
    <div className={active ? 'my-modal active' : 'my-modal'} onClick={() => setActive(false)}>
      <div className='my-modal-content' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
