import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Users from "./components/users";
import Orders from "./components/orders";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registrationForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import ProductForm from "./components/productForm";
import Products from "./components/products";
import Profile from "./components/profile";
import UserForm from "./components/userForm";
import OrderForm from "./components/orderForm";

class App extends Component {

  render() {

    return (
      <React.Fragment>
        <ToastContainer />
        <main className="container">
          <Switch>
            <Route path="/" exact component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <ProtectedRoute path="/logout" component={Logout} />
            <ProtectedRoute path="/products/:id" component={ProductForm} />
            <ProtectedRoute path="/users/:id" exact component={UserForm} />
            <ProtectedRoute path="/orders/:id" component={OrderForm} />
            <ProtectedRoute path="/products" exact component={Products} />
            <ProtectedRoute path="/users" component={Users} />
            <ProtectedRoute path="/orders" component={Orders} />
            <ProtectedRoute path="/not-found" component={NotFound} />
            <Route path="/profile" component={Profile} />
            <Redirect from="/*" to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
