import axiosInstance from "../utils/axiosInstance";

export const getSuppliers = async (limit = 10, skip = 0, q = "", sort = "") => {
  const res = await axiosInstance.get("/suppliers", {
    params: {
      limit,
      skip,
      q,
      sort,
    },
  });
  return res.data;
};

export const createSupplier = async (data: any) => {
  const res = await axiosInstance.post("/suppliers", data);
  return res.data;
};

export const updateSupplier = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/suppliers/${id}`, data);
  return res.data;
};

export const deleteSupplier = async (id: string) => {
  const res = await axiosInstance.delete(`/suppliers/${id}`);
  return res.data;
};

// export const getTags = async () => {
//   const res = await axiosInstance.get("/posts/tags");
//   return res.data;
// };
