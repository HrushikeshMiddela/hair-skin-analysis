import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // if you use cookies, else can omit
});

// Add Authorization header interceptor
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');  // or wherever you store the JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
