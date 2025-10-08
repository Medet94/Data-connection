import axios from 'axios';

export const apiConfig = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const audioApiConfig = axios.create({
  baseURL: 'http://localhost:4000/',
});
