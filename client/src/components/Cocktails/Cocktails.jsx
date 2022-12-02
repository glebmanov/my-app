import React, { useState } from 'react'

import CocktailsPage from './pages/CocktailsPage'
import IngredientsPage from './pages/IngredientsPage'
import Modal from '../Modal'
import ModalContentCocktail from './components/ModalContentCocktail'

import './styles/cocktails.scss'
import data from './cocktailList'

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
          <IngredientsPage
            cocktails={data.cocktails}
            ingredientList={data.ingredients}
            categories={data.categories}
            openModal={openModalCocktail}
          />
        ) : null}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <ModalContentCocktail cocktail={currentCocktail} ingredientList={data.ingredients} />
      </Modal>
    </>
  )
}

export default Cocktails
