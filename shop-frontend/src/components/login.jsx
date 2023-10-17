import React, { Component } from "react";
import loginBg from "../images/traditional-food-feat.jpg";
import shoplabel from "../images/shop-label.png";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { email: "", password: "" },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // send a data to backend
    console.log(
      "sending  -- " +
        this.state.account.email +
        "---" +
        this.state.account.password
    );
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
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
                value={account.email}
                label="Email"
                onChange={this.handleChange}
              />
              <Input
                name="password"
                value={account.password}
                label="Password"
                onChange={this.handleChange}
              />

              <button type="submit" class="btn btn-primary px-4">
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
