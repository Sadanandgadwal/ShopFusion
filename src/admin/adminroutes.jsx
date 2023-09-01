import React from "react";
import { Routes, Route } from "react-router-dom";
import Adminlogin from "./login";
import PostProducts from "./PostProducts";

const AdminAppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Adminlogin />} />
      <Route path="/PostProducts" element={<PostProducts />} />
    </Routes>
  );
};

export default AdminAppRoutes;
