import axios from 'axios';

const url = 'http://localhost:8080';

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
    .catch(err => console.log(err));
}

function addEvent(event) {
  axios.post(`${url}/event`, event)
    .catch(err => console.log(err));
}

function deleteEvent(_id) {
  axios.delete(`${url}/event/${_id}`)
    .catch(err => console.log(err));
}

export {getBuildings, getAllEvents, updateEvent, addEvent, deleteEvent}