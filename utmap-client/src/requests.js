import axios from 'axios';

const url = 'http://localhost:5000';

function getBuildings() {
  return axios.get(`${url}/building`)
    .then(res => res.data.body, err => console.log(err));
}

function getAllEvents() {
  return axios.get(`${url}/event`)
    .then(res => res.data.body, err => console.log(err));
}

function updateEvent(event) {
  axios.put(`${url}/event/${event._id}`, event)
    .then(res => console.log(`PUT /event - ${res.status}: ${res.message}`));
}


export {getBuildings, getAllEvents, updateEvent}