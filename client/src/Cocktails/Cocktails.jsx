import React, { useState } from 'react'

import CocktailsPage from './pages/CocktailsPage.jsx'
import IngredientsPage from './pages/IngredientsPage.jsx'
import Modal from './components/Modal.jsx'
import ModalContentCocktail from './components/ModalContentCocktail.jsx'

import './styles/cocktails.scss'
import data from './cocktailList.js'

const Cocktails = () => {
  const [page, setPage] = useState('cocktails')
  const [modalActive, setModalActive] = useState(false)
  const [currentCocktail, setCurrentCocktail] = useState({})
  const openModalCocktail = cocktail => {
    setCurrentCocktail(cocktail)
    setModalActive(true)
  }

  return (
    <>
      <div className='nav'>
        <div id='menu'>
          <span onClick={() => setPage('cocktails')}>Cocktails</span>
          <span onClick={() => setPage('build')}>Build cocktails</span>
        </div>
      </div>
      <div className='content'>
        {page === 'cocktails' ? (
          <CocktailsPage cocktails={data.cocktails} ingredientList={data.ingredients} openModal={openModalCocktail} />
        ) : null}
        {page === 'build' ? (
          <IngredientsPage cocktails={data.cocktails} ingredientList={data.ingredients} categories={data.categories} />
        ) : null}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <ModalContentCocktail cocktail={currentCocktail} ingredientList={data.ingredients} />
      </Modal>
    </>
  )
}

export default Cocktails
