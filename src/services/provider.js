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

export async function updateUser(payload) {
  const result = await provider.put('/user/edit/', payload);

  if (result.data.message) {
    return {error: true, message: result.data.message};
  }

  return result.data;
}

export async function getMyLists(id) {
  const result = await provider.get(`/list?user=${id}`);
  return result.data;
}

export async function getFeed(id) {
  const result = await provider.get(`/feed?user=${id}`);
  return result.data;
}

export async function createList(payload) {
  const result = await provider.post('/list/', payload);
  return result.data;
}

export async function createLike(payload) {
  const result = await provider.post('/like/', payload);
  return result.data;
}

export async function deleteLike(payload) {
  const result = await provider.post('/deslike/', payload);
  return result.data;
}

export async function createComment(payload) {
  const result = await provider.post('/comment/', payload);
  return result.data;
}

export async function deleteComment(id) {
  const result = await provider.delete('/comment/', {data: {id: id}});
  console.log(result);
  return result.data;
}
