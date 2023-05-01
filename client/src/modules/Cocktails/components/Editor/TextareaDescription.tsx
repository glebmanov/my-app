import React from 'react'
import { useFormContext } from 'react-hook-form'

const TextareaDescription: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <>
      <label>
        <span>Description</span>
        <textarea
          {...register('description', {
            maxLength: {
              value: 255,
              message: 'maximum length 255 characters',
            },
          })}
        />
      </label>
      <div className='error'>{errors?.description && <p>{errors?.description?.message?.toString() || 'Error'}</p>}</div>
    </>
  )
}

export default TextareaDescription
