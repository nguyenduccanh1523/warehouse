import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import "../profile.scss";
import {
  getOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
} from "../../../services/orderitem.api";
import { getProducts } from "../../../services/product.api";
import { getOrders } from "../../../services/order.api";
import { message, Select } from "antd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import OrderItemModal from "./OrderItemModal";

interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
  product?: {
    id: string;
    name: string;
  };
  order?: {
    id: string;
    name: string;
  };
}

const PAGE_SIZE = 10;

const MySwal = withReactContent(Swal);

const sortOptions = [
  { label: "ID ↑", value: "id" },
  { label: "ID ↓", value: "-id" },
];

const OrderItem = () => {
  const [total, setTotalPages] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [sort, setSort] = useState("");
  const [data, setData] = useState<OrderItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(total / limit);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<OrderItem | null>(null);
  const [products, setProducts] = useState<{ id: string; name: string }[]>([]);
  const [productId, setProductId] = useState<string | undefined>(undefined);
  const [orders, setOrders] = useState<{ id: string; name: string }[]>([]);
  const [orderId, setOrderId] = useState<string | undefined>(undefined);


  const fetchData = async () => {
    try {
      const result = await getOrderItems(
        limit,
        skip,
        sort,
        productId,
        orderId
      );
      setData(result.data || []);
      setTotalPages(result.total || 1);
    } catch (error) {
      console.error("Error fetching order items:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const result = await getProducts();
      setProducts(result.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const result = await getOrders();
      setOrders(result.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProducts();
    fetchOrders();
  }, [limit, skip, sort, productId, orderId]);

  const handlePageChange = (newPage: number) => {
    const newSkip = (newPage - 1) * limit;
    setCurrentPage(newPage);
    setSkip(newSkip);
    fetchData();
  };

  const handleAddNew = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (orderItem: OrderItem) => {
    setEditData(orderItem);
    setModalOpen(true);
  };

  const handleDelete = (orderItem: OrderItem) => {
    MySwal.fire({
      title: "Bạn có chắc muốn xóa sản phẩm này?",
      text: orderItem.product?.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOrderItem(orderItem.id);
          MySwal.fire("Đã xóa!", "", "success");
          fetchData();
        } catch {
          MySwal.fire("Xóa thất bại!", "", "error");
        }
      }
    });
  };

  const handleModalOk = async (values: any) => {
    try {
      if (editData) {
        await updateOrderItem(editData.id, values);
        message.success("Cập nhật thành công!");
      } else {
        await createOrderItem(values);
        message.success("Tạo mới thành công!");
      }
      setModalOpen(false);
      fetchData();
    } catch (err) {
      message.error("Lưu thất bại!");
    }
  };

  const handleModalCancel = () => {
    setModalOpen(false);
  };

  return (
    <div className="profile-wrapper">
      <main className="profile-main">
        <div className="profile-header-row">
          <button className="add-btn" onClick={handleAddNew}>
            Add new
          </button>
          <div className="profile-filters">
            <Select
              allowClear
              style={{ minWidth: 200 }}
              placeholder="Lọc theo đơn hàng"
              value={orderId || undefined}
              onChange={(value) => setOrderId(value)}
              options={orders.map((order) => ({
                label: order.name,
                value: order.id,
              }))}
            />
            <Select
              allowClear
              style={{ minWidth: 200 }}
              placeholder="Chọn để tìm kiếm"
              value={sort || undefined}
              onChange={(value) => setSort(value)}
              options={sortOptions}
            />
            <Select
              allowClear
              style={{ minWidth: 200 }}
              placeholder="Lọc theo sản phẩm"
              value={productId || undefined}
              onChange={(value) => setProductId(value)}
              options={products.map((product) => ({
                label: product.name,
                value: product.id,
              }))}
            />
            <Select
              allowClear
              style={{ minWidth: 100 }}
              placeholder="Số lượng"
              value={limit}
              onChange={(value) => {
                setLimit(value);
              }}
              options={[
                { label: "10", value: 10 },
                { label: "20", value: 20 },
                { label: "50", value: 50 },
                { label: "100", value: 100 },
              ]}
            />
          </div>
        </div>
        <div className="profile-table-wrapper">
          <table className="profile-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Order</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Product</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    Không có dữ liệu
                  </td>
                </tr>
              ) : (
                data.map((item, idx) => (
                  <tr key={item.id || idx}>
                    <td>{item.id}</td>
                    <td>{item.order_id}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{item.product?.name}</td>
                    <td>
                      <div className="profile-actions">
                        <button
                          className="icon-btn"
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <svg
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M4 21h17"
                              stroke="#222"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M15.5 6.5l2 2M7 17l8.5-8.5a1.414 1.414 0 0 1 2 2L9 19H7v-2Z"
                              stroke="#222"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <button
                          className="icon-btn"
                          title="Delete"
                          onClick={() => handleDelete(item)}
                        >
                          <svg
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M3 6h18"
                              stroke="#222"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6h12Z"
                              stroke="#222"
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="profile-pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </main>
      <OrderItemModal
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        initialValues={editData}
      />
    </div>
  );
};

export default OrderItem;
