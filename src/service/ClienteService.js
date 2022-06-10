import http from '../http-common';

class ClienteService {
  getClientes() {
    return http.get('/all');
  }

  setCliente(data) {
    return http.post('/cadastrar', data);
  }
}

export default new ClienteService();
