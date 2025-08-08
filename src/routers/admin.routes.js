
import Profile from "../components/Profile/Profile";
import Supplier from "../components/Profile/Suppliers/Supplier";
import Product from "../components/Profile/Product/Product";
import Order from "../components/Profile/Order/Order";
import OrderItem from "../components/Profile/OrderItem/OrderItem";

export const AdminRouters = [
  {
    path: "/customers",
    element: <Profile />,
  },
  {
    path: "/suppliers",
    element: <Supplier />,
  },
  {
    path: "/products",
    element: <Product />,
  },
  {
    path: "/orders",
    element: <Order />,
  },
  {
    path: "/orderitems",
    element: <OrderItem />,
  }

];
