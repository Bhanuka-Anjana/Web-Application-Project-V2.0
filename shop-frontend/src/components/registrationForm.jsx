import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import {registerUser} from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      imgURL: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    firstName: Joi.string().min(2).max(50).required().label("First Name"),
    lastName: Joi.string().min(2).max(50).required().label("Last Name"),
    email: Joi.string().min(5).max(255).required().email().label("Email"),
    imgURL: Joi.string().min(5).max(1024).required(),
    password: Joi.string().min(5).max(255).required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const response = await registerUser(this.state.data);
      console.log(response);
      // //await auth.loginWithJwt(responce.headers["x-auth-token"]);
     window.location = "/products";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1 className="d-flex justify-content-center mt-4 mb-5">
          Register With New Account
        </h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row my-4">
            <div className="col">
              {this.renderInput("firstName", "First Name")}
            </div>
            <div className="col">
              {this.renderInput("lastName", "Last Name")}
            </div>
          </div>
          <div className="row my-3">
            <div className="col ">{this.renderInput("email", "Email")}</div>
            <div classNameName="col mt-4">
              {this.renderInput("imgURL", "Profile picture")}
            </div>
          </div>
          <div className="row my-4">
            <div className="col">
              {this.renderInput("password", "Password", "password")}
            </div>
            <div className="col">
              {this.renderInput("password", "Re-Enter Password", "password")}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-4">
            {this.renderButton("Register")}
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
