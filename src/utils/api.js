// api.js

import axios from 'axios';

// const devUrl = 'http://localhost:6500/api';
// const devUrl = 'http://192.168.0.106:6500/api';
const devUrl = 'https://mentalhealthbackend-q6el.onrender.com/api';
// // exp://192.168.0.106:8081
// exp://192.168.193.107:8081
const apiRequest = axios.create({
  baseURL: devUrl,
  // withCredentials: true, // This is useful for cookies if needed
});

export default apiRequest;
