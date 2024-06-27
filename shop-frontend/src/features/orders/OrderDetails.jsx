import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

export default function OrderDetails() {
  const { id } = useParams();
  const order = useSelector((state) =>
    state.order.data.find((order) => order._id === id)
  );
  const user = useSelector((state) =>
    state.user.data.find((user) => user._id === order.userId)
  );
  const { products } = useSelector((state) => state.product);

  return (
    <div className="container">
      <h1>Order Details</h1>
      <Card>
        <Card.Header>
          <h2>Order Information</h2>
        </Card.Header>
        <Card.Body>
          <Card.Title>Order ID: {order._id}</Card.Title>
          <Card.Text>
            <strong>Order Date:</strong> {new Date(order.createDate).toLocaleString() }
          </Card.Text>
          <Card.Text>
            <strong>Order Status:</strong> {order.status}
          </Card.Text>
          <Card.Text>
            <strong>Delivery Method:</strong> {order.pickupDetails.deliveryMethod}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h2>Order Items</h2>
        </Card.Header>
        <Card.Body>
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <Link to={`/products/${item.productId}`}>
                      {
                        products.find((product) => product._id === item.productId)
                          .productName
                      }
                    </Link>
                  </td>
                  <td>{item.quantity}</td>
                  <td>${
                    products.find((product) => product._id === item.productId).unitPrice
                    }
                    </td>
                  <td>${item.quantity * products.find((product) => product._id === item.productId).unitPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h2>Order Summary</h2>
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <strong>Items:</strong> {order.products.length}
          </Card.Text>
          <Card.Text>
            <strong>Total:</strong> ${order.totalCost}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
