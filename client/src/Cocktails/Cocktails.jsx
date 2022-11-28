import React, { useState } from 'react'

import CocktailsPage from './pages/CocktailsPage.jsx'
import IngredientsPage from './pages/IngredientsPage.jsx'
import Modal from './components/Modal.jsx'

import './styles/cocktails.scss'
import data from './cocktailList.js'

const Cocktails = () => {
  const [page, setPage] = useState('cocktails')
  const [modalActive, setModalActive] = useState(false)

  return (
    <>
      <div className='nav'>
        <div id='menu'>
          <span onClick={() => setPage('cocktails')}>Cocktails</span>
          <span onClick={() => setPage('build')}>Build cocktails</span>
        </div>
      </div>
      <div className='content'>
        {page === 'cocktails' ? <CocktailsPage cocktails={data.cocktails} ingredientList={data.ingredients} /> : null}
        {page === 'build' ? (
          <IngredientsPage cocktails={data.cocktails} ingredientList={data.ingredients} categories={data.categories} />
        ) : null}
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        cocktail={data.cocktails[0]}
        ingredientList={data.ingredients}
      />
    </>
  )
}

export default Cocktails
