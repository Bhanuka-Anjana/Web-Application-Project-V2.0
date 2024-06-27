import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import { productDelete, productUpdate } from "./productSlice";
import productImage from "../../assets/default/product.jpg";
import "./style.css";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [error, setError] = useState(null);
  const categories = useSelector((state) => state.category.data);
  const user = useSelector((state) => state.auth.data);
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    const product = products.find((product) => product?._id === id);
    if (product) {
      setProduct(product);
    } else {
      navigate("/not-found");
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productToUpdate = {
        productName: product.productName,
        unitPrice: product.unitPrice,
        categoryId: product.categoryId,
        numberInStock: product.numberInStock,
        file: product.file,
      };
      const response = await dispatch(
        productUpdate({ id: id, product: productToUpdate })
      ).unwrap();
      if (product) {
        navigate("/products");
      }
    } catch (error) {
      setError("Failed to update product");
    }
  };

  const handleDelete = async () => {
    //delete product
    try {
      const response = await dispatch(productDelete(id)).unwrap();
      if (response) {
        navigate("/products");
      }
    } catch (error) {
      setError("Failed to delete product");
    }
  };

  //display product details
  return (
    <div className="product container">
      <div className="column">
        {/* is imageUrl avau=ilable */}
        {product?.imageUrl ? (
          <img src={product?.imageUrl} alt={product?.productName} />
        ) : (
          <img src={productImage} alt={product?.productName} />
        )}
      </div>
      <div className="column">
        <Form onSubmit={handleSubmit} className="product-form">
          <h2>Product Details</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="productName"
              value={product?.productName}
              onChange={handleChange}
              disabled={!user?.isAdmin}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Unit Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Price"
              name="unitPrice"
              value={product?.unitPrice}
              onChange={handleChange}
              disabled={!user?.isAdmin}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="0"
              name="numberInStock"
              value={product?.numberInStock}
              onChange={handleChange}
              disabled={!user.isAdmin}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="categoryId"
              value={product?.categoryId}
              onChange={handleChange}
              disabled={!user?.isAdmin}
            >
              <option>Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          {user.isAdmin && (
            <Form.Group className="mb-3">
              <Form.Label>Picture</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleFileChange}
              />
            </Form.Group>
          )}
          {user?.isAdmin &&
            (!loading ? (
              <>
                <Button variant="primary" type="submit">
                  Update
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={handleDelete}
                  className="mt-3"
                >
                  Delete
                </Button>
              </>
            ) : (
              <button class="btn btn-success" type="button" disabled>
                <span
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Loading...
              </button>
            ))}
        </Form>
      </div>
    </div>
  );
}
