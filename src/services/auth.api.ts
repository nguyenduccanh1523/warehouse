import axios from 'axios';

export const login = async (username: string, password: string) => {
  const res = await axios.post('https://be-warehouse-production.up.railway.app/api/users/login', { username, password });
  return res.data;
};

export const refreshToken = async (refreshToken: string) => {
  const res = await axios.post('https://be-warehouse-production.up.railway.app/api/users/refresh-token', {
    refreshToken,
  });
  return res.data;
};