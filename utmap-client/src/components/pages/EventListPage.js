import React from 'react'
import EventList from '../EventList'

// This file is an example implementation of event list. 
// This file should be removed when the /eventlist route is
// removed from App.js and integrated into the sidebar

const exampleEvents = [
    { 
    title: 'Cry and not code',  
    description: `Have you ever been invited to an event called 'Cry and Code', but you end up going and finding
    yourself staring at code and not making sense of any of it? Well in this awesome event we are going to cut out
    the middleman and go straight to crying! The event organizer, Leila, will have you crying in no time with her
    collection of your exam grades.`,
    startDate: '2021-01-03T09:45', 
    location: 'Davis',
  }, {
    title: 'owo?',
    description: 'uwu!',
    startDate: '2021-01-05T09:45', 
    location: 'Deerfield Hall',
  }
]

function EventListPage() {
    return (
        <div style={{width:'500px'}}>
            <EventList eventList={exampleEvents}/>
        </div>
    )
}

export default EventListPage
