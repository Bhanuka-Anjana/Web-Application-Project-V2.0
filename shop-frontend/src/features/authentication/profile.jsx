import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { updateUser } from "./authSlice";
import { Alert } from "react-bootstrap";
import profile from "../../assets/default/user.png";

export default function Profile() {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.auth);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);

  // TODO: configure the file  upload

  useEffect(() => {
    if (data) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if any field is empty
    if (!firstName || !lastName) {
      setError("All fields are required");
      return;
    }

    // chack the updated values are same as the old values
    if (firstName === data.firstName && lastName === data.lastName && !file) {
      setError("No changes made");
      return;
    }
    // TODO: unable to update profile

    // Update the user data
    setError(null);
    try {
      const response = await dispatch(
        updateUser({ id: data._id, data: { firstName, lastName, file } })
      ).unwrap();
      if (response) {
        setFirstName(response.firstName);
        setLastName(response.lastName);
      }
    } catch (error) {
      toast.error("Unable to update profile");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Profile</h1>
      <hr />
      {data?.profilePicturePath ? (
        <img
          src={data.profilePicturePath}
          alt="profile"
          className="rounded-circle"
          style={{
            width: "150px",
            height: "150px",
          }}
        />
      ) : (
        <img src={profile} alt="profile" className="rounded-circle" />
      )}
      <Form onSubmit={handleSubmit} className="mt-4">
        <Alert variant="danger" show={error}>
          {error}
        </Alert>
        <Form.Group className="mb-3 mt-5">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="position-relative mb-3">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
        </Form.Group>

        {loading ? (
          <Button variant="success" disabled={true}>
            Updating... <Spinner animation="grow" size="sm" />
          </Button>
        ) : (
          <Button variant="primary" type="submit">
            Update
          </Button>
        )}
      </Form>
    </div>
  );
}
