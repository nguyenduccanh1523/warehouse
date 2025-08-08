import axiosInstance from "../utils/axiosInstance";

export const getOrders = async (limit = 10, skip = 0, order_date = "", sort = "", customer_id = "") => {
  const res = await axiosInstance.get("/orders", {
    params: {
      limit,
      skip,
      ...(order_date ? { order_date } : {}),
      ...(sort ? { sort } : {}),
      ...(customer_id ? { customer_id } : {}),
    },
  });
  return res.data;
};

export const createOrder = async (data: any) => {
  const res = await axiosInstance.post("/orders", data);
  return res.data;
};

export const updateOrder = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/orders/${id}`, data);
  return res.data;
};

export const deleteOrder = async (id: string) => {
  const res = await axiosInstance.delete(`/orders/${id}`);
  return res.data;
};

// export const getTags = async () => {
//   const res = await axiosInstance.get("/posts/tags");
//   return res.data;
// };
