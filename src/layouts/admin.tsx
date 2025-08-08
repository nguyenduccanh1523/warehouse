import React from "react";
import './admin.scss';

//settingoffCanvas

import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";

const AdminLayout = () => {
  return (
    <>
      <div className="profile-wrapper">
        <SideNav />
        <main className="profile-main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
