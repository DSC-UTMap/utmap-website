import axios from 'axios';

const port = process.env.REACT_APP_SERVER_PORT ? 
             process.env.REACT_APP_SERVER_PORT : 8080;
const host = process.env.REACT_APP_SERVER_HOST ? 
             process.env.REACT_APP_SERVER_HOST : 'localhost';
const url = `http://${host}:${port}`;

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
    .catch(err => err);
}

function addEvent(event) {
  axios.post(`${url}/event`, event)
    .catch(err => console.log(err));
}

function deleteEvent(_id) {
  axios.delete(`${url}/event/${_id}`)
  .then(res => res.status, err =>
    {if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return err.response.status;
    } else if (err.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.log(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', err.message);
    }
    })
}

export {getBuildings, getAllEvents, updateEvent, addEvent, deleteEvent}