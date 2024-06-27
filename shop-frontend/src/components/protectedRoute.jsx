import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  return auth ? <Outlet /> : <>{navigate("/login")}</>;
}
