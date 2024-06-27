import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1> NotFound </h1>
      <Button  onClick={() => navigate("/")}>Go Home</Button>
    </>
  );
};

export default NotFound;
