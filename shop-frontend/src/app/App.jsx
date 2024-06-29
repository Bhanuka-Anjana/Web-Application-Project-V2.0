import { Routes, Route, useNavigate } from "react-router-dom";
import ProductsList from "./../features/products/ProductsList";
import Product from "../features/products/product";
import AdminRoute from "../components/AdminRoute";
import ProtectedRoute from "../components/protectedRoute";
import OrdersList from "./../features/orders/OrdersList";
import OrderDetails from "./../features/orders/OrderDetails";
import UsersList from "./../features/users/UsersList";
import UserDetails from "./../features/users/UserDetails";
import CartList from "./../features/cart/CartList";
import LoginForm from "./../features/authentication/loginForm";
import RegistrationForm from "./../features/authentication/registrationForm";
import NavBar from "../components/NavBarr";
import Unauthorized from "./../components/unauthorized/unauthorized";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../features/authentication/authSlice";
import { useCallback, useEffect, useState } from "react";
import Profile from "../features/authentication/profile";
import { fetchProducts } from "../features/products/productSlice";
import { fetchCategories } from "../features/Category/categorySlice";
import NotFound from "./../components/notFound";
import CategoryList from "../features/Category/CategoryList";
import Category from "../features/Category/category";
import { fetchUsers } from "../features/users/userSlice";
import { fetchOrders } from "../features/orders/orderSlice";

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const initApp = useCallback(async () => {
    await dispatch(fetchUserData());
    await dispatch(fetchProducts());
    await dispatch(fetchCategories());
    await dispatch(fetchUsers());
    await dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [isAuthenticated]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route index element={<ProductsList />} />
        <Route path="login" element={<LoginForm />} />
        <Route path="register" element={<RegistrationForm />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="cart">
          <Route element={<ProtectedRoute />}>
            <Route index element={<CartList />} />
          </Route>
        </Route>

        <Route path="products">
          <Route index element={<ProductsList />} />
          <Route path=":id" element={<Product />} />
        </Route>

        <Route path="orders">
          <Route element={<ProtectedRoute />}>
            <Route index element={<OrdersList />} />
            <Route element={<AdminRoute />}>
              <Route path=":id" element={<OrderDetails />} />
            </Route>
          </Route>
        </Route>

        <Route path="users">
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminRoute />}>
              <Route index element={<UsersList />} />
              <Route path=":id" element={<UserDetails />} />
            </Route>
          </Route>
        </Route>

        <Route path="categories">
          <Route element={<AdminRoute />}>
            <Route index element={<CategoryList />} />
            <Route path=":id" element={<Category />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
