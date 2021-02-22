import React from 'react';
import PropTypes from 'prop-types';
import EventListItem from './EventListItem';

function EventList (props) {
  return (
      <>
          {/* Display an Accordion for each item in eventList */}
          {props.eventList.map((event) => (<EventListItem event={event}/>))}
      </>
  )
}

// PropTypes
EventList.propTypes = {
  eventList: PropTypes.array.isRequired
}

export default EventList
