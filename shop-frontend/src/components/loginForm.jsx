import React from "react";
import Joi from "joi-browser";
import GoogleButton from "react-google-button";
import { Link, Redirect } from "react-router-dom";
import loginBg from "../images/traditional-food-feat.jpg";
import shoplabel from "../images/shop-label.png";
import Form from "./common/form";
import { login, loginWithGmail, getCurrentUser } from "../services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const confomation = await login(data.email, data.password);
      if (confomation) {
        const { state } = this.props.location;
        window.location = state ? state.from.pathname : "/products";
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  onGoogleLogin = async () => {
    const data = await loginWithGmail();
  };

  render() {
    //if (getCurrentUser()) return <Redirect to="/products" />;
    return (
      <div className="container-fluid g-0">
        <div className="row g-0">
          <div className="col-7 vh-100 thumbnail text-center">
            <img
              className="image-fluid"
              src={loginBg}
              alt=""
              width="100%"
              height="100%"
            />
            <h1 className="caption"> Online Cafetaria </h1>
            <img src={shoplabel} className="shop-label" alt="" height="100%" />
          </div>
          <div className="col-5 text-center">
            <h1 className="mt-5 mb-5">Login</h1>
            <div className="d-flex justify-content-center">
              <GoogleButton onClick={this.onGoogleLogin} />
            </div>

            <div class="divider d-flex justify-content-center mt-5">
              <hr width="200px" />
              <p className=" fw-bold mx-3 mb-0 text-muted">OR</p>
              <hr width="200px" />
            </div>

            <form className="px-4 ml-4" onSubmit={this.handleSubmit}>
              <div className="mt-5">{this.renderInput("email", "Email")}</div>
              <div className="my-3">
                {this.renderInput("password", "Password", "password")}
              </div>
              <div className="mt-4">{this.renderButton("Login")}</div>
            </form>
            <p className="mt-5">Don't have an account ?</p>
            <Link className="navbar-brand underline-text" to="/register">
              SIGN UP NOW
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
