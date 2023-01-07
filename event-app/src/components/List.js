import EventCard from "./EventCard"
import './List.css';
import { Link } from 'react-router-dom'
import Search from "./Search";

const List = ({ partyState, setPartyState, yourParties, setYourParties, showDelBtn }) => {
  
  const partiesToShow = yourParties ? yourParties : partyState

  return (
    <>
    {!showDelBtn && (<Search setPartyState={setPartyState} />)}

    <section className={`${showDelBtn ? 'list--profile' : 'list'}`}>
      {
        partiesToShow.map( (party, i) => (
          <EventCard 
            key={i} 
            party={party}
            showDelBtn={showDelBtn}
            partyState={partyState} 
            setPartyState={setPartyState} 
            yourParties={yourParties} 
            setYourParties={setYourParties}/>
        ))
      }
    </section>
    
    <Link className="list_eventLink " to='/addevent'><span className="material-symbols-outlined plus-icon">add_circle</span></Link>
    </>
  )
}

export default List
