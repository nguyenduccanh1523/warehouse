import axiosInstance from "../utils/axiosInstance";

export const getOrderItems = async (limit = 10, skip = 0, sort = "", product_id = "", order_id = "") => {
  const res = await axiosInstance.get("/orderitems", {
    params: {
      limit,
      skip,
      ...(sort ? { sort } : {}),
      ...(product_id ? { product_id } : {}),
      ...(order_id ? { order_id } : {}),
    },
  });
  return res.data;
};

export const createOrderItem = async (data: any) => {
  const res = await axiosInstance.post("/orderitems", data);
  return res.data;
};

export const updateOrderItem = async (id: string, data: any) => {
  const res = await axiosInstance.put(`/orderitems/${id}`, data);
  return res.data;
};

export const deleteOrderItem = async (id: string) => {
  const res = await axiosInstance.delete(`/orderitems/${id}`);
  return res.data;
};

// export const getTags = async () => {
//   const res = await axiosInstance.get("/posts/tags");
//   return res.data;
// };
