import React, { Component } from "react";
import Joi from "joi-browser";
import loginBg from "../images/traditional-food-feat.jpg";
import shoplabel from "../images/shop-label.png";
import Input from "./common/input";

class LoginForm extends Component {
  state = {
    account: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    //To avoid instant error found by joi -> {abordEarly : false}
    const { error } = Joi.validate(this.state.account, this.schema, {abortEarly : false});
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({errors : errors|| {}});
    if (errors) return;

    // send a data to backend
    console.log(
      "sending  -- " +
        this.state.account.email +
        "---" +
        this.state.account.password
    );
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({currentTarget}) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(currentTarget);
    if (errorMessage) errors[currentTarget.name] = errorMessage;
    else delete errors[currentTarget.name];

    const account = { ...this.state.account };
    account[currentTarget.name] = currentTarget.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
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
                error={errors.email}
              />
              <Input
                name="password"
                value={account.password}
                label="Password"
                onChange={this.handleChange}
                error={errors.password}
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
