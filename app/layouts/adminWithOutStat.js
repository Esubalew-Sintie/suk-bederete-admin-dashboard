"use client"
import React from "react";

// components


import AdminNavbar from "@/app/components/Navbars/AdminNavbar"
import Sidebar from "@/app/components/Sidebar/Sidebar.js";
import HeaderStats from "@/app/components/Headers/HeaderStats.js";
import FooterAdmin from "@/app/components/Footers/FooterAdmin.js";
import AdminNav from "../components/Navbars/AdminNav";

 
function AdminWithOutStat({ children }) {
  return (
    <>
      <Sidebar />

      <div className="relative md:ml-64 bg-blueGray-100">
      <AdminNavbar />
        {/* Header */}
        <AdminNav />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

export default AdminWithOutStat