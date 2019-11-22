import axios from 'axios';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

const provider = axios.create({
  baseURL: 'https://powerful-garden-76062.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export async function login(payload) {
  const result = await provider.post('/login/', payload);

  if (result.data.message) {
    return {error: true, message: result.data.message};
  }

  return result.data;
}

export async function register(payload) {
  const result = await provider.post('/user/register/', payload);

  if (result.data.message) {
    return {error: true, message: result.data.message};
  }

  return result.data;
}

export async function getMyLists(id) {
  const result = await provider.get(`/list?user=${id}`);
  return result.data;
}
