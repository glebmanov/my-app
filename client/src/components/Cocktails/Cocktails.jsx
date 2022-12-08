import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCocktails } from 'store/cocktailsSlice'

import CocktailsPage from './pages/CocktailsPage'
import IngredientsPage from './pages/IngredientsPage'
import Modal from '../Modal'
import ModalContentCocktail from './components/ModalContentCocktail'
import Editor from './components/Editor/Editor'

import './styles/cocktails.scss'
import data from './cocktailList'

const Cocktails = () => {
  const dispatch = useDispatch()
  const cocktails = useSelector(state => state.cocktails.cocktails)
  const [page, setPage] = useState('cocktails')
  const [modalActive, setModalActive] = useState(false)
  const [currentCocktail, setCurrentCocktail] = useState({})
  const openModalCocktail = cocktail => {
    setCurrentCocktail(cocktail)
    setModalActive(true)
  }

  useEffect(() => {
    dispatch(fetchCocktails())
  }, [dispatch])

  return (
    <>
      <div className='nav'>
        <div id='menu'>
          <span onClick={() => setPage('cocktails')}>Cocktails</span>
          <span onClick={() => setPage('build')}>Build cocktails</span>
          <span onClick={() => setPage('editor')}>Cocktail editor</span>
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
        {page === 'editor' ? <Editor /> : null}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <ModalContentCocktail cocktail={currentCocktail} ingredientList={data.ingredients} />
      </Modal>
    </>
  )
}

export default Cocktails
