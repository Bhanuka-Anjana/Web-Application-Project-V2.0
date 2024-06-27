import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserData, registerUser } from "./authSlice";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [file, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        registerUser({ email, password, firstName, lastName, file })
      ).unwrap();
      if (response) {
        const user = await dispatch(fetchUserData()).unwrap();
        if (user) {
          navigate("/");
        }
      }
    } catch (e) {
      toast.error(e?.message);
    }
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit}>
        <h1 className="mt-4">Register</h1>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="profilePicture">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => {
              setProfilePicture(e.target.files[0]);
            }}
            required
          />
        </Form.Group>
        <Button className="mt-4" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
}
