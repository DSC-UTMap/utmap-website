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

function updateEvent(event, _id) {
  axios.put(`${url}/event/${_id}`, event)
    .then(res => console.log(`PUT /event - ${res.status}: ${res.message}`))
    .catch(res => console.log(res));
}


export {getBuildings, getAllEvents, updateEvent}