import axios from 'axios';

const API_ROOT = 'https://poloniex.com/public';
const regexForSplitting = /^\/+|\/+$/g;

function callApi(_method, _path, data) {
  const method = _method.toLowerCase();

  // Remove '/' from path
  const path = _path.replace(regexForSplitting, '');

  const config = {
    method,
    url: API_ROOT + path,
    headers: {
      'Accept': 'application/json',         // eslint-disable-line
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    if (method === 'get') {
      config.params = data;
    } else {
      config.data = data;
    }
  }

  return axios(config)
    .then(response => response.data)
    .catch((err) => {
      if (err.response && err.response.data) {
        return Promise.reject(err.response.data);
      }

      return Promise.reject(err);
    });
}

// api services
export default {
  getTicker: () => callApi('get', '?command=returnTicker'),
  createDeal: data => Promise.resolve(data),
  removeDeal: id => Promise.resolve(id),
};
