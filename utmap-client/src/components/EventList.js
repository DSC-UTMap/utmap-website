import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import EventListItem from './EventListItem';

function EventList (props) {
  return (
      <div>
          <Typography variant="h5" gutterBottom>Upcoming Events</Typography>
          {/* Display an Accordion for each item in eventList */}
          {props.eventList.map((event) => (<EventListItem event={event}/>))}
      </div>
  )
}

// PropTypes
EventList.propTypes = {
  eventList: PropTypes.array.isRequired
}

export default EventList
