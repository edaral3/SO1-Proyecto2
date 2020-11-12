import axios from 'axios';

export function getPosts() {
  return axios.get('http://localhost:5000/getTop3');
}

export function getPosts2() {
  return axios.get('http://localhost:5000/getRedis');
}

