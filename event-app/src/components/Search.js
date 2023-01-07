import React, { useRef } from 'react'
import axios from 'axios';
import './Search.css';

const Search = ({setPartyState}) => {
//   const titleField = useRef()
  const locationField = useRef()

  const searchEvent = event => {
    event.preventDefault();

    if (locationField.current.value) {
       axios
          .get(`${process.env.REACT_APP_DOMAIN}/events?location=${locationField.current.value}`)
          .then(response => setPartyState(response.data))
    }
    locationField.current.value = '';
  }
  return (
    <form className='search' onSubmit={searchEvent}>
      {/* <label className="search__label-title" htmlFor="titleInp">Party</label>
      <input
        className="search__input"
        ref={titleField}
        name="titleInp"
        id="titleInp"
        placeholder="Search for an event..." /> */}
      <label className="search__label-location" htmlFor="locationInp">Find an event near you</label>
      <input
        className="search__location"
        ref={locationField}
        name="locationInp"
        id="locationInp"
        placeholder="Search for a location..." />
      <button type='submit' className='search__button'>Search</button>
    </form>
  )
}
export default Search