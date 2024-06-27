import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  removeProduct,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "./cartSlice";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { orderCreate } from "../orders/orderSlice";
import productDefaultImage from "../../assets/default/product.jpg";

export default function CartList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalCost, setTotalPrice] = React.useState(0);
  const cart = useSelector((state) => state.cart.data);
  const user = useSelector((state) => state.auth.data);
  const { products } = useSelector((state) => state.product);
  const [pickupDetails, setPickupDetails] = React.useState({
    address: "",
    contactNumber: "",
    deliveryMethod: "Delivery",
  });

  useEffect(() => {
    let total = 0;
    cart.forEach((cartItem) => {
      const product = products.find((product) => product._id === cartItem.id);
      total += product.unitPrice * cartItem.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  const handlePlaceOrder = async () => {
    //create order
    const order = {
      userId: user._id,
      products: cart.map((cartItem) => ({
        productId: cartItem.id,
        quantity: cartItem.quantity,
      })),
      totalCost,
      pickupDetails,
    };
    try {
      const resposne = await dispatch(orderCreate(order)).unwrap();
      if (resposne) {
        // clear the cart
        dispatch(clearCart());
        navigate("/orders");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeProduct(product));
  };

  const handleQuantityIncrement = (cartItem) => {
    //check available quantity is greater than cartItem.quantity
    if (
      products.find((product) => product._id === cartItem.id).numberInStock >
      cartItem.quantity
    ) {
      //dispatch incrementQuantity action
      dispatch(incrementQuantity({ id: cartItem.id }));
    }
  };

  return (
    <Container>
      <h1>Cart Items</h1>
      {cart.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <div>
          {/* display cart items as horizontally scrollable list */}
          <div
            style={{
              width: "100%",
              overflowX: "auto",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {cart.map((cartItem) => {
              const product = products.find(
                (product) => product._id === cartItem.id
              );
              return (
                <div
                  style={{
                    margin: "10px",
                    minWidth: "200px",
                  }}
                >
                  <Card key={cartItem.id}>
                    <Card.Img
                      variant="top"
                      src={product.imageUrl || productDefaultImage}
                      style={{
                        width: "230px",
                        height: "150px",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>
                        Price: ${product.unitPrice} <br />
                        Quantity: {cartItem.quantity}
                      </Card.Text>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveFromCart(cartItem)}
                      >
                        Remove
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => handleQuantityIncrement(cartItem)}
                        className="mx-3"
                      >
                        +
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() =>
                          dispatch(decrementQuantity({ id: cartItem.id }))
                        }
                      >
                        -
                      </Button>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
          <hr className="mt-2" />
          <h2 className="mt-5">Total: ${totalCost}</h2>
          <hr className="mt-5" />

          {/* order delivery methods (address, pickup, etc..) */}
          <h2>Delivery Options</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter delivery address"
                onChange={(e) =>
                  setPickupDetails({
                    ...pickupDetails,
                    address: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            {/* contact no. */}
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                onChange={(e) =>
                  setPickupDetails({
                    ...pickupDetails,
                    contactNumber: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Method</Form.Label>
              <Form.Control
                as="select"
                onChange={(e) =>
                  setPickupDetails({
                    ...pickupDetails,
                    deliveryMethod: e.target.value,
                  })
                }
                required
                defaultValue={"Delivery"}
              >
                <option> Delivery </option>
                <option>Pickup</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <hr className="mt-5" />
          <Button
            variant="danger"
            onClick={() => dispatch(clearCart())}
            className="mx-3"
          >
            Clear Cart
          </Button>

          <Button variant="success" onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </div>
      )}
    </Container>
  );
}
