import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useNavigate } from "react-router-dom";
import Placeholder from "react-bootstrap/Placeholder";
import { addProduct } from "../cart/cartSlice";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { fetchProducts, productCreate } from "./productSlice";
import { Spinner } from "react-bootstrap";
import productImage from "../../assets/default/product.jpg";

export default function ProductsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const orders = useSelector((state) => state.order.data);
  const categories = useSelector((state) => state.category.data);
  const user = useSelector((state) => state.auth.data);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [selectedCategory, setSelectedCategory] = useState({
    id: "All",
    name: "All",
  });
  const [fillteredData, setFillteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState({
    productName: "",
    unitPrice: 0,
    categoryId: "",
    numberInStock: 0,
    file: null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToCart = (id) => {
    //dispatch addProduct action
    if (isAuthenticated) {
      if (user.isAdmin === false) {
        dispatch(addProduct({ id: id, quantity: 1 }));
      }
    } else {
      navigate("/login");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(product);
      const response = await dispatch(productCreate(product)).unwrap();
      if (response) {
        setShow(false);
        setProduct({
          productName: "",
          unitPrice: 0,
          categoryId: "",
          numberInStock: 0,
          file: null,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, file: e.target.files[0] });
  };

  useEffect(() => {
    if (products) {
      if (selectedCategory.id === "All") {
        setFillteredData(products);
      } else {
        setFillteredData(
          products.filter((product) => product.categoryId === selectedCategory.id)
        );
      }
    }
  }, [selectedCategory, products]);

  const initProducts = useCallback(async () => {
    try {
      await dispatch(fetchProducts()).unwrap();
    } catch (error) {
      console.error();
    }
  }, [orders]);

  useEffect(() => {
    initProducts();
  }, [orders]);

  if (loading)
    return (
      //return 10 no of placeholders
      <Row>
        {[...Array(20)].map((_, index) => (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                <Placeholder xs={4} /> <Placeholder xs={6} />{" "}
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={6} />
            </Card.Body>
          </Card>
        ))}
      </Row>
    );

  return (
    <>
      {error && <h1>{error}</h1>}
      {fillteredData.length === 0 ? (
        <>
          <h2>Sort by: </h2>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {selectedCategory?.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setSelectedCategory({ id: "All", name: "All" });
                }}
              >
                All
              </Dropdown.Item>
              {categories.map((category) => (
                <Dropdown.Item
                  key={category._id}
                  onClick={() => {
                    setSelectedCategory({
                      id: category._id,
                      name: category.name,
                    });
                  }}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <h1>No products found</h1>;
        </>
      ) : (
        <Row className="mx-5" >
          <Row>
            <Col className="mx-4">
              <h2>Sort by: </h2>
              <Dropdown>
                <Dropdown.Toggle variant="success">
                  {selectedCategory.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setSelectedCategory({ id: "All", name: "All" });
                    }}
                  >
                    All
                  </Dropdown.Item>
                  {categories.map((category) => (
                    <Dropdown.Item
                      key={category._id}
                      onClick={() => {
                        setSelectedCategory({
                          id: category._id,
                          name: category.name,
                        });
                      }}
                    >
                      {category.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col >
              {user.isAdmin && (
                <Button variant="primary" onClick={handleShow} className="mt-3">
                  Add new product
                </Button>
              )}
            </Col>
          </Row>
          {fillteredData &&
            fillteredData.map((product) => (
              
              <Col  className="d-flex ">
                <Card style={{ width: "20rem" }} key={product._id} className="my-2">
                  {product.imageUrl ? (
                    <Card.Img variant="top" src={product.imageUrl} style={{
                      "height": "215px"
                    }}/>
                  ) : (
                    <Card.Img variant="top" src={productImage} />
                  )}
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>Price: {product.unitPrice}</Card.Text>
                    <Card.Text>Amount: {product.numberInStock}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => {
                        navigate(`/products/${product._id}`);
                      }}
                      className="mx-3"
                    >
                      More info
                    </Button>
                    <Button
                      variant="success"
                      disabled={product.numberInStock === 0 || user.isAdmin}
                      onClick={() => {
                        handleAddToCart(product._id);
                      }}
                    >
                      Add to cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="productName"
                value={product.productName}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Unit Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price"
                name="unitPrice"
                value={product.unitPrice}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                name="numberInStock"
                value={product.numberInStock}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="categoryId"
                value={product.categoryId}
                onChange={handleChange}
              >
                <option>Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Product Picture</Form.Label>
              <Form.Control
                type="file"
                name="file"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {loading ? (
            <Button variant="success" disabled>
              Loading... <Spinner animation="grow" variant="light" />
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Create
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
