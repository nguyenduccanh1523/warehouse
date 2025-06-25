import Login from "../components/Login/Login ";
import Profile from "../components/Profile/Profile";
import PrivateRoute from "./private.routes";




export const SimpleRouter = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element:
        <PrivateRoute>
            <Profile />
        </PrivateRoute>
  }

];
