import React from 'react'

interface IModal {
  active: boolean
  setActive: (value: boolean) => void
  children: JSX.Element | JSX.Element[] | string
}

const Modal: React.FC<IModal> = ({ active, setActive, children }) => {
  return (
    <div className={active ? 'my-modal active' : 'my-modal'} onClick={() => setActive(false)}>
      <div className='my-modal-content' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
