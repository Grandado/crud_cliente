export default class CidadesService {
  getCidades() {
    return fetch('demo/data/cidades-brasileiras.json').then((res) =>
      res.json()
    );
  }
}
