import React from "react";
import Joi from "joi-browser";
import loginBg from "../images/traditional-food-feat.jpg";
import shoplabel from "../images/shop-label.png";
import Input from "./common/input";
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
    const { data, errors } = this.state;
    return (
      <div className="container-fluid px-0">
        <div className="row g-0">
          <div className="col-lg-7 vh-100 thumbnail text-center">
            <img src={loginBg} alt="" width="100%" height="100%" />
            <h1 className="caption"> Online Cafetaria </h1>
            <img src={shoplabel} className="shop-label" alt="" height="100%" />
          </div>
          <div className="col-lg-5 vh-100 ">
            <form onSubmit={this.handleSubmit}>
              <Input
                name="email"
                value={data.email}
                label="Email"
                onChange={this.handleChange}
                error={errors.email}
              />
              <Input
                name="password"
                value={data.password}
                label="Password"
                onChange={this.handleChange}
                error={errors.password}
              />

              <button
                disabled={this.validate()}
                type="submit"
                class="btn btn-primary px-4"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
