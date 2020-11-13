import axios from 'axios';
import url from '../url';

export function getPosts() {
  return axios.get(url.url+'getTop3');
}

export function getPosts2() {
  return axios.get(url.url+'getRedis');
}

