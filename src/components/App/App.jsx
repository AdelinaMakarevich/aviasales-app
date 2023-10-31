import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getSearchId } from '../../store/actionCreators/ticketsCreators'
import img from '../assets/Logo.png'
import TicketsList from '../TicketsList'
import Filter from '../Filter'

import styles from './App.module.scss'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSearchId())
  }, [dispatch])

  return (
    <div>
      <header className={styles.header}>
        <img src={img} alt="logo" />
      </header>
      <main className={styles.main}>
        <Filter />
        <TicketsList />
      </main>
    </div>
  )
}

export default App
