import axios from 'axios';

export const login = async (username: string) => {
  const res = await axios.post('https://api-test-web.agiletech.vn/auth/login', { username });
  return res.data;
};

export const refreshToken = async (refreshToken: string) => {
  const res = await axios.post('https://api-test-web.agiletech.vn/auth/refresh-token', {
    refreshToken,
  });
  return res.data;
};