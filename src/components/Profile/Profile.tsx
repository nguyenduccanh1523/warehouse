import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import "./profile.scss";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customer.api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { Modal, message, Select } from "antd";
import ProfileModal from "./ProfileModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const PAGE_SIZE = 10;

const MySwal = withReactContent(Swal);

const sortOptions = [
  { label: "ID ↑", value: "id" },
  { label: "ID ↓", value: "-id" },
  { label: "Name ↑", value: "name" },
  { label: "Name ↓", value: "-name" },
  { label: "Email ↑", value: "email" },
  { label: "Email ↓", value: "-email" },
  { label: "Address ↑", value: "address" },
  { label: "Address ↓", value: "-address" },
];

const Profile = () => {
  const [total, setTotalPages] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState("");
  const [data, setData] = useState<Customer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(total / limit);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Customer | null>(null);

  const fetchData = async () => {
    try {
      const result = await getCustomers(limit, skip, q, sort);
      setData(result.data || []);
      setTotalPages(result.total || 1);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit, skip, q, sort]);

  const handlePageChange = (newPage: number) => {
    const newSkip = (newPage - 1) * limit;
    setCurrentPage(newPage);
    setSkip(newSkip);
    fetchData();
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  const handleAddNew = () => {
    setEditData(null);
    setModalOpen(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditData(customer);
    setModalOpen(true);
  };

  const handleDelete = (customer: Customer) => {
    MySwal.fire({
      title: "Bạn có chắc muốn xóa khách hàng này?",
      text: customer.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCustomer(customer.id);
          MySwal.fire("Đã xóa!", "", "success");
          fetchData();
        } catch {
          MySwal.fire("Xóa thất bại!", "", "error");
        }
      }
    });
  };

  const handleModalOk = async (values: any) => {
    console.log("c", values);
    try {
      if (editData) {
        await updateCustomer(editData.id, values);
        message.success("Cập nhật thành công!");
      } else {
        await createCustomer(values);
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
      <aside className="profile-sidebar">
        <div className="profile-logo">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAjCAYAAAA9guKMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKUSURBVHgB7ZhNbtpAFMf/b0ylfkgt7CvFOUFyhOzSdhNygkBCpdAVPQHOCZKsEkUg4ASw6scuvQE3gNBVV1BVbVQp9uubgUTko8XYow6K8lswxh77zZ83M/7zCAvCsNLOqh/Pthi8BuZVEHxzgdEFUV8Bnef19dZd9xIWgOHOhzzBa8iIszO6ihgKbopRcMz37c/7BNWOIUDjR+Cm3FOdPuk0E3owTBwgAUR08KK2/t4cwxHD7Y8FGUgDKWBEm7n6m44zEaOdTz1pfKSCRhz+WvbggEkWCkjPY9Cjb04WtgjYgD3W3OxOjFVYgggrbkRQ2rVwDd/5e8IGDyIWhQcRi0LmrpONSi8bnme2oMQWw2yHvrlA3AVTX7R3SkcvW1gQbtmOWnmQl0Z7mpm2WMQEScSI5WBY5Np0qpcH+9KILUYsWwxEzfq7r1U45kqEHoz8PBXMCTMHE/HOMCJOdgcFPRgkRIuvlXt5OMKIUAQLU8Jr6A0BDlA6C4AVL5O9+K0KcICSLNizxWy25P+OTCfyYQkitQIHiAi25u0BqxY7NvfEO7F+89pCbEmsbhZjMnWloIZ4geM8j/ksVkebMcFnikP+AksQZdpx+jHDWkyPqK0yT6OmHI+Qnn5sMxidN3XNCGmRaanrsqp4sCwPC4tIjQri9sw1N0dsIaYiCkyrP0pHyx3J8SESImthb15LrsuP4rmSxyTeu6yOX22xpeOlih4M5kXEvz1eCpCAXP1VRQ8GcyI12MNc7XVw+f3Wn6KT3V5BkacNoY9/Y6ahyWJKTFkTVJ1Zj2KpvVJY1FmcPv3XgvJEjPgq9qXb+K2u93e9PUZ06j25aI3Xkz3GNVq1Idn1Jc5UTOqKyNMo/NnS6+nmfX8AK8/tG1ht4o0AAAAASUVORK5CYII="
            alt="Logo"
          />
        </div>
        <nav className="profile-nav">
          <a href="#" className="active">
            Posts
          </a>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </nav>
      </aside>
      <main className="profile-main">
        <div className="profile-header-row">
          <button className="add-btn" onClick={handleAddNew}>
            Add new
          </button>
          <div className="profile-filters">
            <input
              type="text"
              placeholder="Title"
              value={q}
              onChange={(e) => setQ(e.target.value)}
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
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
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
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
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
      <ProfileModal
        open={modalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        initialValues={editData}
      />
    </div>
  );
};

export default Profile;
