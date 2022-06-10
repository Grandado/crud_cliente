import axios from 'axios';
export default axios.create({
  baseURL: 'https://web-service-crud.herokuapp.com/cliente',
  headers: {
    'Content-type': 'application/json',
  },
});
