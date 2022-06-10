import http from '../http-common';

class ClienteService {
  getClientes() {
    return http.get('/all');
  }

  setCliente(data) {
    return http.post('/cadastrar', data);
  }

  alterCliente(data) {
    return http.post('/alterar', data);
  }

  excluirCliente(id) {
    return http.post('/excluir', id);
  }
}

export default new ClienteService();
