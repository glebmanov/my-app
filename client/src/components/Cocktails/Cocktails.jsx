import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getCocktails, getIngredients } from 'store/cocktailsSlice'

import CocktailsPage from './pages/CocktailsPage'
import IngredientsPage from './pages/IngredientsPage'
import Modal from '../Modal'
import ModalContentCocktail from './components/ModalContentCocktail'
import Editor from './components/Editor/Editor'

import './styles/cocktails.scss'

const Cocktails = () => {
  const dispatch = useDispatch()
  const cocktail = useSelector(state => state.cocktails.cocktail)
  const cocktails = useSelector(state => state.cocktails.cocktails)
  const categories = useSelector(state => state.cocktails.categories)
  const ingredients = useSelector(state => state.cocktails.ingredients)
  const [page, setPage] = useState('cocktails')
  const [modalActive, setModalActive] = useState(false)

  useEffect(() => {
    dispatch(getCocktails())
    dispatch(getCategories())
    dispatch(getIngredients())
  }, [dispatch])

  useEffect(() => {
    if (cocktail.amount) setModalActive(true)
  }, [cocktail])

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
        {page === 'cocktails' ? <CocktailsPage cocktails={cocktails} /> : null}
        {page === 'build' ? (
          <IngredientsPage cocktails={cocktails} ingredientList={ingredients} categories={categories} />
        ) : null}
        {page === 'editor' ? <Editor ingredients={ingredients} /> : null}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        <ModalContentCocktail cocktail={cocktail} ingredients={ingredients} />
      </Modal>
    </>
  )
}

export default Cocktails
