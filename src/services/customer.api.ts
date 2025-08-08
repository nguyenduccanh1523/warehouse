import axiosInstance from "../utils/axiosInstance";

export const getCustomers = async (limit = 10, skip = 0, q = "", sort = "") => {
  const res = await axiosInstance.get("/customers", {
    params: {
      limit,
      skip,
      q,
      sort,
    },
  });
  return res.data;
};

export const createCustomer = async (data: any) => {
  const res = await axiosInstance.post("/customers", data);
  return res.data;
};

export const updateCustomer = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/customers/${id}`, data);
  return res.data;
};

export const deleteCustomer = async (id: string) => {
  const res = await axiosInstance.delete(`/customers/${id}`);
  return res.data;
};

// export const getTags = async () => {
//   const res = await axiosInstance.get("/posts/tags");
//   return res.data;
// };
