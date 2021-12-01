import styles from './searchTopBar.module.css'
import React, { useReducer } from 'react'
import { useAppContext } from '../context/AppWrapper'
const DESTIONATIONS = ['Val Thorens','Courchevel','Tignes','La Plagne','Chamonix','Les Menuires',"L'alpes D'huez",'Les Deux Alpes']
const today = new Date()
const DEFAULTS = {
  destination: DESTIONATIONS[0], 
  people: 2, 
  startDate: today.toLocaleDateString(), 
  endDate: today.toLocaleDateString()
}
const formReducer = (state, event) => ({
  ...state,
  [event.name]: event.value
})

export default function SearchTopBar(props) {
  const [formData, setFormData] = useReducer(formReducer, DEFAULTS);

  const { sendSearchQuery } = useAppContext()
  const handleChange = event => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  }
  const onSearchClicked = (e) => {
    // todo: validateQuery
    sendSearchQuery(formData)
  }

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        logo
      </div>
      <div className={styles.inputs}>
        <select className={styles.input} name="destination" onChange={handleChange} value={DEFAULTS.destination}>
          {DESTIONATIONS.map((des) => <option key={des} value={des}>{des}</option>)}
        </select>
        <input className={styles.input} onChange={handleChange} name="people" type='number' min='1' max='10' value={formData.people || DEFAULTS.people} />
        <input className={styles.input} onChange={handleChange} name="startDate" type='date' value={formData.startDate} />
        <input className={styles.input} onChange={handleChange} name="endDate" type='date' value={formData.endDate} />
      </div>
      <div className={styles.search} onClick={onSearchClicked}>
        search
      </div>
    </div>
  )
}