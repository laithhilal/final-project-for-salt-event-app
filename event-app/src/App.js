import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/auth/protected-route';
import Header from './components/Header';
import List from './components/List';
import AddEvent from './components/AddEvent';
import EventPage from './components/EventPage';

function App() {  
  const [ partyState, setPartyState ] = useState([]);
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_DOMAIN}/events`)
      .then(response => setPartyState(response.data))
  }, [])

  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} setPartyState={setPartyState} />
      <Routes> 
        <Route path="/" element={<List partyState={partyState} setPartyState={setPartyState} partiesFiltered={null}/>} />
        <Route path="/userprofile" element={<UserProfile partyState={partyState} setPartyState={setPartyState}/>} />

        {partyState.map(party => (
          party._id && (
            <Route
              key={party._id} 
              path={`/events/${party._id}`} 
              element={
                <EventPage 
                  party={party}
                  setPartyState={setPartyState}/>
              }/>)
        ))}

        <Route
          path="/addevent"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AddEvent partyState={partyState} setPartyState={setPartyState}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;



