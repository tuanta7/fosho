import axios from 'axios';
import { BASE_URL } from './constant';

async function fetchPublicGet(url, params) {
  const response = await axios.get(`${BASE_URL}/public${url}`, { params });
  return response.data.data; // axios have a data key in response
}

async function fetchWithAccessToken(method, url, accessToken, payload) {
  const response = await axios.request({
    url: `${BASE_URL}${url}`,
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: payload,
  });
  return response.data.data;
}

async function fetchWithCredentials(method, url) {
  const response = await axios.request({
    url: `${BASE_URL}${url}`,
    method,
    withCredentials: true,
  });
  return response.data;
}

async function fetchWithAccessTokenAndCredentials(method, url, accessToken) {
  const response = await axios.request({
    url,
    method: method,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

export {
  fetchPublicGet,
  fetchWithAccessToken,
  fetchWithCredentials,
  fetchWithAccessTokenAndCredentials,
};
