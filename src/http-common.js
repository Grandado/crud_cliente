import axios from 'axios';
export default axios.create({
  baseURL: 'https://web-service-crud.herokuapp.com/cliente', //'http://localhost:3000/cliente'
  headers: {
    'Content-type': 'application/json',
  },
});
