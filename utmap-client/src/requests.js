import axios from 'axios';

const port = process.env.REACT_APP_SERVER_PORT ?
  process.env.REACT_APP_SERVER_PORT : 8080;
const host = process.env.REACT_APP_SERVER_HOST ?
  process.env.REACT_APP_SERVER_HOST : 'http://localhost';
const url = `${host}:${port}`;

function getBuildings() {
  return axios.get(`${url}/building`)
    .then(res => res.data.body, err => {
      if (err.response) {
        return Promise.reject(err.response.status);
      } else {
        return Promise.reject(500)
      }
    })
}

function getAllEvents() {
  return axios.get(`${url}/event`)
    .then(res => res.data.body, err => {
      if (err.response) {
        return Promise.reject(err.response.status);
      } else {
        return Promise.reject(500)
      }
    })
}

async function updateEvent(event, _id) {
  await axios.put(`${url}/event/${_id}`, event)
    .then(res => Promise.resolve(res.status), err => {
      if (err.response) {
        return Promise.reject(err.response.status);
      } else {
        return Promise.reject(500)
      }
    })
}

async function addEvent(event) {
  await axios.post(`${url}/event`, event)
    .then(res => Promise.resolve(res.status), err => {
      if (err.response) {
        return Promise.reject(err.response.status);
      } else {
        return Promise.reject(500)
      }
    })
}

async function deleteEvent(_id) {
  await axios.delete(`${url}/event/${_id}`)
    .then(res => Promise.resolve(res.status), err => {
      if (err.response) {
        return Promise.reject(err.response.status);
      } else {
        return Promise.reject(500)
      }
    })
}

export { getBuildings, getAllEvents, updateEvent, addEvent, deleteEvent }