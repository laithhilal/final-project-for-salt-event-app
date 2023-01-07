import axios from 'axios';
import { useRef } from 'react';
import './AddEvent.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

const AddEvent = ({ partyState, setPartyState }) => {
  
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const locationRef = useRef(null);
  const dateRef = useRef(null);
  const { user } = useAuth0();
  const navigate = useNavigate();
  
  const addEvent = (event) => {
    event.preventDefault()

    axios
      .post(`${process.env.REACT_APP_DOMAIN}/events`, {
        title: titleRef.current.value,
        desc: descRef.current.value,
        location: locationRef.current.value,
        date: dateRef.current.value,
        userID: user.sub.split('|')[1]
      })
      .then(() => {
        titleRef.current.value = ''
        descRef.current.value = ''
        locationRef.current.value = ''
        dateRef.current.value = ''

        axios
          .get(`${process.env.REACT_APP_DOMAIN}/events`)
          .then(response => setPartyState(response.data))
          .then(() =>  navigate('/'))
			})
  } 

  return (
    <div className="addEvent__div">
      <Link className="addEvent__listLink" to='/'><span className="material-symbols-outlined back-icon">arrow_back_ios_new</span></Link>
      <form className="addEvent" onSubmit={addEvent}>
        <label className="addEvent__label-title" htmlFor="titleInput">Title</label>
        <input className="addEvent__input-title" required ref={titleRef} name="title" id="titleInput" placeholder="Write a title..." />

        <label className="addEvent__label-desc" htmlFor="descInput">Description</label>
        <textarea className="addEvent__input-desc" required ref={descRef} name="desc" id="descInput" placeholder="Write a description..." />

        <label className="addEvent__label-location" htmlFor="locationInput">Location</label>
        <input className="addEvent__input-location" required ref={locationRef} name="location" id="locationInput" placeholder="Add location..." />

        <label className="addEvent__label-date" htmlFor="dateInput">Date</label>
        <input className="addEvent__input-date" required ref={dateRef} name="date" id="dateInput" type='datetime-local' />

        <button className="addEvent__button" type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddEvent