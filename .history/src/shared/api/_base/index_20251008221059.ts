import axios from 'axios';

export const apiConfig = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const trackApiConfig = axios.create({
  baseURL: 'http://localhost:4000/tracks?_page=1&_limit=10',
});
