export default class ClienteService {
  getClientes() {
    return fetch('demo/data/products-small.json')
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
