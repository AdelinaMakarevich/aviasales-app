import React from 'react'
import { format, add } from 'date-fns'

import styles from './Ticket.module.scss'

const Ticket = ({ tickets }) => {
  const { price, segments, carrier } = tickets
  const [toDestination, fromDestination] = segments

  function getTimeFromMins(mins) {
    const hours = Math.round(mins / 60)
    const minutes = mins % 60
    return `${hours}ч ${minutes}м`
  }

  function transformTime(date, duration) {
    const departureTime = format(new Date(date), 'hh:mm')
    const destinationTime = format(add(new Date(date), { minutes: duration }), 'hh:mm')
    return {
      departureTime,
      destinationTime,
    }
  }

  function transferAmount(stops) {
    const numStops = stops.length

    if (numStops === 0) {
      return 'пересадок'
    }
    if (numStops === 1) {
      return '1 пересадка'
    }
    return `${numStops} пересадки`
  }

  return (
    <article className={styles.ticket}>
      <h5 className={styles.ticketHeader}>
        {price} Р
        <img className={styles.ticketLogo} src={`https://pics.avs.io/99/36/${carrier}.png`} alt={carrier} />
      </h5>
      <TableInfo segment={toDestination} />
      <TableInfo segment={fromDestination} />
    </article>
  )
  function TableInfo({ segment }) {
    const { origin, destination, date, duration, stops } = segment
    const { departureTime, destinationTime } = transformTime(date, duration)

    return (
      <div className={styles.flightInformation}>
        <p className={styles.informationHeader}>
          {origin} – {destination}
        </p>
        <p className={styles.informationHeader}>В пути</p>
        <p className={styles.informationHeader}>{transferAmount(stops)}</p>
        <p className={styles.informationContent}>
          {departureTime} – {destinationTime}
        </p>
        <p className={styles.informationContent}>{getTimeFromMins(duration)}</p>
        <p className={styles.informationContent}>{stops.length ? stops.join(', ') : 'НЕТ'}</p>
      </div>
    )
  }
}
export default Ticket
