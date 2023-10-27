import React, { useEffect, useCallback } from 'react'
import { Radio, Button, Progress, Alert } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import uniqid from 'uniqid'

import { getTickets, showTickets } from '../../store/actionCreators/ticketsCreators'
import { selectTicketsByFilter, selectSearchId, selectTicketsToShow, selectTabs } from '../../store/selectors'
import Ticket from '../Ticket'
import { tabsToggle } from '../../store/actionCreators/tabsCreators'

import styles from './TicketsList.module.scss'

const TicketsList = () => {
  const dispatch = useDispatch()
  const tabs = useSelector(selectTabs)
  const handleChange = (event) => {
    dispatch(tabsToggle(event.target.value))
  }
  const filteredTickets = useSelector(selectTicketsByFilter)
  const ticketsToShow = useSelector(selectTicketsToShow)
  const searchId = useSelector(selectSearchId)

  const showMoreTickets = useCallback(() => {
    dispatch(showTickets())
  }, [dispatch])
  useEffect(() => {
    const retryGetTickets = async () => {
      try {
        const stop = await dispatch(getTickets(searchId))
        if (!stop) {
          retryGetTickets()
        }
      } catch (error) {
        retryGetTickets()
      }
    }

    if (searchId) {
      retryGetTickets()
    }
  }, [dispatch, searchId])
  return (
    <section className={styles.ticketsListBlock}>
      <Radio.Group className={styles.radioGroup} defaultValue="1" buttonStyle="solid">
        <Radio.Button className={styles.radioButton} value="1" checked={tabs.check} onChange={handleChange}>
          Самый дешевый
        </Radio.Button>
        <Radio.Button className={styles.radioButton} value="2" checked={tabs.check} onChange={handleChange}>
          Самый быстрый
        </Radio.Button>
      </Radio.Group>
      <ProgressBar />
      {filteredTickets.length ? (
        filteredTickets.slice(0, ticketsToShow).map((ticket) => <Ticket key={uniqid()} tickets={ticket} />)
      ) : (
        <Alert
          className={styles.radioGroup}
          message="No tickets found, please try to use one of the filters"
          type="warning"
          showIcon
        />
      )}
      <Button className={styles.radioGroup} type="primary" disabled={!filteredTickets.length} onClick={showMoreTickets}>
        Показать еще 5 билетов!
      </Button>
    </section>
  )
}

function ProgressBar() {
  const tickets = useSelector((state) => state.ticketsReducer.tickets)
  const percent = Math.round((tickets.length / 8806) * 100)
  let style = styles.progress

  if (percent === 100) {
    style = styles.hidden
  }

  return <Progress className={style} percent={percent} showInfo={false} status="active" />
}

export default TicketsList
