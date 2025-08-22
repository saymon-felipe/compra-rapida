import axios from 'axios';

let url_api;

const dev_environment = "http://192.168.15.8:3000/"; // Ambiente de desenvolvimento.
const prod_environment = "https://gourmetech-coreteste-5d758e07e0da.herokuapp.com/"; // Ambiente de teste.

// Ambiente, 0 para dev e 1 para producao
let ambient = 0;

switch (ambient) {
  case 0:
    url_api = dev_environment;
    break;
  case 1:
    url_api = prod_environment;
    break;
}

const api = axios.create({
  baseURL: url_api,
});

export default {
  install(app) {
    app.config.globalProperties.api = api;
  }
};
