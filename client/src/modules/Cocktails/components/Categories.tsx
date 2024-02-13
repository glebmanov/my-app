import React, { FC } from 'react'
import { CategoriesButtons } from './Buttons/CategoriesButtons'
import { OptionButtons } from './Buttons/OptionButtons'

export const Categories: FC = () => {
  return (
    <div className='categories'>
      <div className='buttons'>
        <CategoriesButtons />

        <OptionButtons />
      </div>
    </div>
  )
}
