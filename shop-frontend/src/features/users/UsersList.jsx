import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, removeUser, setAdmin } from "./userSlice";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UsersList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.data);
  const admin = useSelector((state) => state.auth.data);

  useEffect(() => {}, [users]);

  const handleDelete = async (userId) => {
    try {
      await dispatch(removeUser(userId)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleIsAdmin = async (userId) => {
    try {
      await dispatch(setAdmin(userId)).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Users</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>isAdmin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>
                <Link
                  to={admin._id == user._id ? `/profile` : `/users/${user._id}`}
                >
                  {user._id.slice(0, 8)}
                </Link>
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <Button
                  onClick={() => {
                    if (user.isAdmin) {
                      handleIsAdmin(user._id);
                    } else {
                      handleIsAdmin(user._id);
                    }
                  }}
                  variant={user.isAdmin ? "danger" : "success"}
                >
                  {user.isAdmin ? "Demote " : "Promote"}
                </Button>
              </td>
              {/* Add a delete button */}
              <td>
                <Button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
