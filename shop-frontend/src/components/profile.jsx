import React, { Component } from "react";
import {getCurrentUser} from "../services/authService";
import { getUser } from "../services/userService";

class Profile extends Component {
  state = { user: {} };
  async componentDidMount() {
    const user = getCurrentUser();
    const userDetails = await getUser(user._id);
    this.setState({ user: userDetails.data });
  }
  render() {
    const {user} = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card mt-5">
              <div className="card-header">
                <h3>Profile Page</h3>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label>First Name:</label>
                  <p className="form-control">{user.firstName}</p>
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <p className="form-control">{user.lastName}</p>
                </div>
                <div className="form-group">
                  <label>Registration ID:</label>
                  <p className="form-control">{user.registrationID}</p>
                </div>
                <div className="form-group">
                  <label>Contact Number:</label>
                  <p className="form-control">{user.contactNumber}</p>
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <p className="form-control">{user.email}</p>
                </div>
                <div className="form-group">
                  <label>Profile Image:</label>
                  <img src={user.imgURL} alt="Profile" className="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
