import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { categoryDelete, categoryUpdate } from "./categorySlice";

export default function Category() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setCategory] = useState();
  const [error, setError] = useState(null);
  const categories = useSelector((state) => state.category.data);
  const user = useSelector((state) => state.auth.data);
  const products = useSelector((state) => state.product.data);

  useEffect(() => {
    const tempcategory = categories.find((c) => c?._id === id);
    if (tempcategory) {
      setCategory(tempcategory);
    } else {
      navigate("/not-found");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(
        categoryUpdate({ id: id, data: {name: category.name} })
      ).unwrap();
      if (response) {
        navigate("/categories");
      }
    } catch (error) {
      setError("Failed to update category");
    }
  };

  const handleDelete = async () => {
    //delete product
    try {
      const response = await dispatch(categoryDelete(id)).unwrap();
      if (response) {
        navigate("/categories");
      }
    } catch (error) {
      setError("Failed to delete cateory");
    }
  };

  //display product details
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                name="name"
                value={category?.name}
                onChange={handleChange}
                disabled={!user?.isAdmin}
              />
            </Form.Group>

            {user?.isAdmin && (
              <>
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <Button variant="danger" type="button" onClick={handleDelete}>
                  Delete
                </Button>
              </>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
