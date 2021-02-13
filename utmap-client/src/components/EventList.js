import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import EventListItem from './EventListItem';

export class EventList extends Component {

  render() {
      return (
          <div>
              <Typography variant="h5" gutterBottom>Upcoming Events</Typography>
              {/* Display an Accordion for each item in eventList */}
              {this.props.eventList.map((event) => (<EventListItem event={event}/>))}
          </div>
      )
    }
}

// PropTypes
EventList.propTypes = {
  eventList: PropTypes.array.isRequired
}

export default EventList
