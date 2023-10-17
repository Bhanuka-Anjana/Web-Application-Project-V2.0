import React from "react";
import Joi from "joi-browser";
import { Link } from "react-router-dom";
import loginBg from "../images/traditional-food-feat.jpg";
import shoplabel from "../images/shop-label.png";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // send a data to backend
    console.log(
      "sending  -- " + this.state.data.email + "---" + this.state.data.password
    );
  };

  render() {
    return (
      <>
        <div className="container-fluid px-0">
          <div className="row g-0">
            <div className="col-lg-7 vh-100 thumbnail text-center">
              <img src={loginBg} alt="" width="100%" height="100%" />
              <h1 className="caption"> Online Cafetaria </h1>
              <img
                src={shoplabel}
                className="shop-label"
                alt=""
                height="100%"
              />
            </div>
            <div className="col-lg-5 vh-100 ">
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("email", "Email")}
                {this.renderInput("password", "Password", "password")}
                {this.renderButton("Login")}
              </form>
              <Link className="navbar-brand" to="/register">
                Vidly
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default LoginForm;
