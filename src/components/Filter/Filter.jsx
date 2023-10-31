import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import uniqid from 'uniqid'
import { Checkbox } from 'antd'

import { filterToggle, filterAllToggle } from '../../store/actionCreators/filterCreators'
import { selectFilters } from '../../store/selectors'

import styles from './Filter.module.scss'

function Filter() {
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)

  const handleChange = (e) => {
    if (e.target.id === 4) {
      return dispatch(filterAllToggle())
    }
    return dispatch(filterToggle(e.target.id))
  }

  return (
    <div className={styles.filterContainer}>
      <h1 className={styles.filterHeader}>Количество пересадок</h1>
      <ul className={styles.radioWrapper}>
        {filters.map(({ id, value, check }) => {
          return (
            <li key={uniqid()}>
              <Checkbox className={styles.checkbox} onChange={handleChange} checked={check} id={id}>
                {value}
              </Checkbox>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Filter
