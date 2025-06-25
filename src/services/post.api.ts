import axiosInstance from '../utils/axiosInstance';

export const getPosts = async (page = 1, title = '', tags = '') => {
    const res = await axiosInstance.get('/posts', {
      params: {
        page,
        title,
        tags,
      },
    });
    return res.data;
  };

export const createPost = async (data: any) => {
  const res = await axiosInstance.post('/posts', data);
  return res.data;
};

export const updatePost = async (id: string, data: any) => {
  const res = await axiosInstance.patch(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id: string) => {
  const res = await axiosInstance.delete(`/posts/${id}`);
  return res.data;
};

export const getTags = async () => {
    const res = await axiosInstance.get('/posts/tags');
    return res.data;
  };