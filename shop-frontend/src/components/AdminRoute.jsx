import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AdminRoute() {
  const admin = useSelector((state) => state.auth.data.isAdmin);
  const navigate = useNavigate();
  return admin ? <Outlet /> : <>{navigate("/unauthorized")}</>;
}
