import axiosInstance from "../utils/axiosInstance";

export const getProducts = async (limit = 10, skip = 0, q = "", sort = "") => {
  const res = await axiosInstance.get("/products", {
    params: {
      limit,
      skip,
      q,
      sort,
    },
  });
  return res.data;
};

export const createProduct = async (data: any) => {
  const res = await axiosInstance.post("/products", data);
  return res.data;
};

export const updateProduct = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id: string) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};

// export const getTags = async () => {
//   const res = await axiosInstance.get("/posts/tags");
//   return res.data;
// };
