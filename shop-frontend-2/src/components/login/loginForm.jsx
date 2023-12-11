import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authenticationSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // Here you might perform authentication logic (e.g., API call) and then dispatch the login action
    try {
      const resposnse = await axios.post(
        "http://localhost:8080/api/auth/local",
        {
          email,
          password,
        }
      );
      if (resposnse.status === 200) {
        dispatch(login(resposnse.data));
        navigate("/");
      }
    } catch (err) {
      console.log("eorrrooo", err);
    }

    // After successful authentication, the login action will update the state
    // which will trigger the PrivateRoute to allow access to the Home component
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
