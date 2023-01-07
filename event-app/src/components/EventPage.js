import './EventPage.css'
import { DateTime } from 'luxon'
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState } from 'react';
import axios from 'axios';

const EventPage = ({ party, setPartyState }) => {
  const { user } = useAuth0()
  const inputTitle = useRef()
  const inputDesc = useRef()
  const inputLocation = useRef()
  const inputDate = useRef()
  // console.log(party)

  const [editingMode, setEditingMode] = useState(false)
  const [editingState, setEditingState] = useState({
    title : party.title,
    desc : party.desc,
    location : party.location,
    date : party.date
  })
  
  const formatedDate = DateTime.fromISO(party.date)

  const editFunc = () => {
    setEditingMode(!editingMode)
  }
  
  const updateEvent = (event) => {
    event.preventDefault()

    const newParty = {
      title: inputTitle.current.value,
      desc: inputDesc.current.value,
      location: inputLocation.current.value,
      date: inputDate.current.value
    }

    axios
      .patch(`${process.env.REACT_APP_DOMAIN}/events/${party._id}`, newParty)
      .then(() => {
        axios
          .get(`${process.env.REACT_APP_DOMAIN}/events`)
          .then(response => {
            setPartyState(response.data)
            setEditingMode(!editingMode)
          })
      })   
  }

  return (
    <div className='EventPage__test'>
    <section className="EventPage">
      {editingMode 
        ? <form className="EventPage__form" onSubmit={updateEvent}>
            <label htmlFor="inputTitle" className='EventPage__label'>Title:</label>
              <input 
                type="text" 
                ref={inputTitle} 
                value={editingState.title} 
                onChange={(event) => setEditingState({...editingState, title: event.target.value})}></input>
            <label htmlFor="inputDesc" className='EventPage__label'>Description:</label>
              <textarea 
                className='EventPage__descInput'
                type="text" 
                ref={inputDesc} 
                value={editingState.desc} 
                onChange={(event) => setEditingState({...editingState, desc: event.target.value})}></textarea>
            <label htmlFor="inputLocation" className='EventPage__label'>Location: </label>
              <input 
                type="text" 
                ref={inputLocation} 
                value={editingState.location} 
                onChange={(event) => setEditingState({...editingState, location: event.target.value})}></input>
            <label htmlFor="inputDate" className='EventPage__label'>Date & Time:</label>
              <input 
                type="datetime-local" 
                ref={inputDate} 
                value={editingState.date} 
                onChange={(event) => setEditingState({...editingState, date: event.target.value})}></input>
            <button type='submit' className="EventPage__saveBtn">Save changes</button>
          </form>
        : <div className='EventPage__test2'>
            <Link className="userProfile__listLink" to='/'>
              <span className="material-symbols-outlined back-icon">arrow_back_ios_new</span>
            </Link>

            <h2 className='EventPage__title'>{party.title}</h2>
            <p className='EventPage__desc'>{party.desc}</p>
            <ul className='EventPage__info'>
              <li className='EventPage__location'><span>Location:</span> {party.location}</li>
              <li className='EventPage__date'><span>Date:</span> {formatedDate.toLocaleString(DateTime.DATE_MED)}</li>
              <li className='EventPage__time'><span>Time:</span> {formatedDate.toLocaleString(DateTime.TIME_24_SIMPLE)}</li>
            </ul>
          </div>}

      {user && user.sub.split('|')[1] === party.userID && (<button className="EventPage__stopEditBtn" type='button' onClick={editFunc}>{editingMode ? 'Cancel':'Edit'}</button>)}

    </section>
    </div>
  )
}

export default EventPage