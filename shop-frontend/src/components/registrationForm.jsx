import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: { firstName: "",lastName: "",registrationID: "",contactNumber: "",email: "",imgURL: "", password: ""},
    errors: {},
  };

  schema = {
    firstName: Joi.string().min(2).max(50).required().label('First Name'),
    lastName: Joi.string().min(2).max(50).required().label('Last Name'),
    registrationID: Joi.string().min(2).max(50).required().label('Reg ID'),
    contactNumber: Joi.string().min(8).max(50).required().label('Contact Number'),
    email: Joi.string().min(5).max(255).required().email().label('Email'),
    imgURL: Joi.string().min(5).max(1024).required(),
    password: Joi.string().min(5).max(255).required().label('Password'),
  };

  doSubmit = () => {
    //send user details to the back-end
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col">{this.renderInput("firstName", "First Name")}</div>
            <div class="col">{this.renderInput("lastName", "Last Name")}</div>
          </div>
          <div class="row">
            <div class="col">
              {this.renderInput("registrationID", "Registration ID No.")}
            </div>
            <div class="col">
              {this.renderInput("contactNumber", "Contact Number")}
            </div>
          </div>
          <div class="row">
            <div class="col">{this.renderInput("email", "Email")}</div>
            <div class="col">
              {this.renderInput("imgURL", "Profile picture")}
            </div>
          </div>
          <div class="row">
            <div class="col">
              {this.renderInput("password", "Password", "password")}
            </div>
            <div class="col">
              {this.renderInput("password", "Re-Enter Password", "password")}
            </div>
          </div>
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
