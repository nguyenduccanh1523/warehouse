import axiosInstance from "../utils/axiosInstance";

export const getOrderItems = async (limit = 10, skip = 0, q = "", sort = "") => {
  const res = await axiosInstance.get("/orderitems", {
    params: {
      limit,
      skip,
      q,
      sort,
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
