import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useEffect } from "react";
import { logout } from "../features/authentication/authSlice";

export default function NavBarr() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, data } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart.data);

  useEffect(() => {}, [isAuthenticated, data, cart]);

  return (
    <Navbar bg="dark" sticky="top" data-bs-theme="dark">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
        >
          CAFETARIA
        </Navbar.Brand>
        <Nav>
          <Nav.Link
            onClick={() => {
              navigate("/products");
            }}
          >
            Products
          </Nav.Link>
          {isAuthenticated && (
            <Nav.Link
              onClick={() => {
                navigate("/orders");
              }}
            >
              Orders
            </Nav.Link>
          )}
          {data?.isAdmin && (
            <Nav>
              <Nav.Link
                onClick={() => {
                  navigate("/categories");
                }}
              >
                Categories
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  navigate("/users");
                }}
              >
                Users
              </Nav.Link>
            </Nav>
          )}
        </Nav>

        <Form inline>
          <Row>
            <Col xs="auto">
              {isAuthenticated && !data.isAdmin && (
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  Cart <Badge bg="secondary">{cart.length}</Badge>
                </Button>
              )}
            </Col>
            <Col className="mx-5" xs="auto">
              {isAuthenticated ? (
                <Navbar.Text
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Signed in as: <a>{data?.firstName}</a>
                </Navbar.Text>
              ) : (
                <Nav>
                  <Nav.Link
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Signup
                  </Nav.Link>
                </Nav>
              )}
            </Col>
            <Col xs="auto">
              {isAuthenticated && (
                <Nav>
                  <Nav.Link
                    href="/"
                    onClick={() => {
                      //logout the user
                      localStorage.removeItem("token");
                      dispatch(logout());
                    }}
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              )}
            </Col>
          </Row>
        </Form>
      </Container>
    </Navbar>
  );
}
