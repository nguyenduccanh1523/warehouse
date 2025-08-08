import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const SideNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("customers");

  // Set active item based on current URL
  useEffect(() => {
    const path = location.pathname;
    if (path === "/customers") setActiveItem("customers");
    else if (path === "/orders") setActiveItem("orders");
    else if (path === "/orderitems") setActiveItem("orderitems");
    else if (path === "/products") setActiveItem("products");
    else if (path === "/suppliers") setActiveItem("suppliers");
  }, [location.pathname]);

  const handleItemClick = (item: string, href: string) => {
    setActiveItem(item);
    // Navigate using React Router
    navigate(href);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };
  return (
    <aside className="profile-sidebar">
      <div className="profile-logo">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADEAAAAjCAYAAAA9guKMAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKUSURBVHgB7ZhNbtpAFMf/b0ylfkgt7CvFOUFyhOzSdhNygkBCpdAVPQHOCZKsEkUg4ASw6scuvQE3gNBVV1BVbVQp9uubgUTko8XYow6K8lswxh77zZ83M/7zCAvCsNLOqh/Pthi8BuZVEHxzgdEFUV8Bnef19dZd9xIWgOHOhzzBa8iIszO6ihgKbopRcMz37c/7BNWOIUDjR+Cm3FOdPuk0E3owTBwgAUR08KK2/t4cwxHD7Y8FGUgDKWBEm7n6m44zEaOdTz1pfKSCRhz+WvbggEkWCkjPY9Cjb04WtgjYgD3W3OxOjFVYgggrbkRQ2rVwDd/5e8IGDyIWhQcRi0LmrpONSi8bnme2oMQWw2yHvrlA3AVTX7R3SkcvW1gQbtmOWnmQl0Z7mpm2WMQEScSI5WBY5Np0qpcH+9KILUYsWwxEzfq7r1U45kqEHoz8PBXMCTMHE/HOMCJOdgcFPRgkRIuvlXt5OMKIUAQLU8Jr6A0BDlA6C4AVL5O9+K0KcICSLNizxWy25P+OTCfyYQkitQIHiAi25u0BqxY7NvfEO7F+89pCbEmsbhZjMnWloIZ4geM8j/ksVkebMcFnikP+AksQZdpx+jHDWkyPqK0yT6OmHI+Qnn5sMxidN3XNCGmRaanrsqp4sCwPC4tIjQri9sw1N0dsIaYiCkyrP0pHyx3J8SESImthb15LrsuP4rmSxyTeu6yOX22xpeOlih4M5kXEvz1eCpCAXP1VRQ8GcyI12MNc7XVw+f3Wn6KT3V5BkacNoY9/Y6ahyWJKTFkTVJ1Zj2KpvVJY1FmcPv3XgvJEjPgq9qXb+K2u93e9PUZ06j25aI3Xkz3GNVq1Idn1Jc5UTOqKyNMo/NnS6+nmfX8AK8/tG1ht4o0AAAAASUVORK5CYII="
          alt="Logo"
        />
      </div>
      <nav className="profile-nav">
        <a
          href="/customers"
          className={activeItem === "customers" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleItemClick("customers", "/customers");
          }}
        >
          Customers
        </a>
        <a
          href="/orders"
          className={activeItem === "orders" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleItemClick("orders", "/orders");
          }}
        >
          Orders
        </a>
        <a
          href="/orderitems"
          className={activeItem === "orderitems" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleItemClick("orderitems", "/orderitems");
          }}
        >
          Order Items
        </a>
        <a
          href="/products"
          className={activeItem === "products" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleItemClick("products", "/products");
          }}
        >
          Products
        </a>
        <a
          href="/suppliers"
          className={activeItem === "suppliers" ? "active" : ""}
          onClick={(e) => {
            e.preventDefault();
            handleItemClick("suppliers", "/suppliers");
          }}
        >
          Suppliers
        </a>
        <button
          onClick={handleLogout}
          style={{
            background: "none",
            border: "none",
            color: "inherit",
            textAlign: "left",
            padding: 0,
            font: "inherit",
            cursor: "pointer",
            textDecoration: "none",
            display: "block",
            width: "100%",
          }}
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};

export default SideNav;
