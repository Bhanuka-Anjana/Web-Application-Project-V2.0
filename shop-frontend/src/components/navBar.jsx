import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {getCurrentUser} from "../services/authService";

class NavBar extends Component {
  state = { user: null };

  async componentDidMount() {
    const {data:user} = await getCurrentUser();
    user? this.setState({user}): this.setState({user:null})
  }
  render() {
    const { user } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand px-5" to="/">
          Cafeteria
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {user && user.isAdmin && (
              <>
                <NavLink className="nav-item nav-link" to="/products">
                  Products
                </NavLink>
                <NavLink className="nav-item nav-link" to="/users">
                  Customers
                </NavLink>
              </>
            )}
            <NavLink className="nav-item nav-link" to="/orders">
              Orders
            </NavLink>
            {user && (
              <>
                <NavLink className="nav-item nav-link" to="/profile">
                  {user.firstName}
                </NavLink>
                <NavLink className="nav-item nav-link" to="/logout">
                  Logout
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
