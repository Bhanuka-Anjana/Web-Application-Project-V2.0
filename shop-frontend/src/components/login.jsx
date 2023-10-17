import React, { Component } from "react";
import loginBg from "../images/traditional-food-feat.jpg";
import shoplabel from "../images/shop-label.png";

class LoginForm extends Component {
  state = {
    account: { email: "", password: "" },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // send a data to backend
    console.log("sending  -- " + this.state.account.email + "---" + this.state.account.password);
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
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
              <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  autoFocus
                  type="email"
                  name="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  value={this.state.account.email}
                  onChange={this.handleChange}
                />
                <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                  value={this.state.account.password}
                  onChange={this.handleChange}
                />
              </div>
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
