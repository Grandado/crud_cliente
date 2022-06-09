export default class EstadosService {
  getEstados() {
    return fetch('demo/data/estados-brasil.json').then((res) => res.json());
  }
}
