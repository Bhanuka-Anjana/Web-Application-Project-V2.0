import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import LoginForm from "./components/loginForm";
import NavBar from "./components/navBar";
import RegisterForm from "./components/registrationForm";
import Products from "./components/products";
import Orders from "./components/orders";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer/>
        <NavBar />
        <main className="container">
          <Routes>
            <Route path="/register" element={<RegisterForm/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/not-found" element={<NotFound/>} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
