import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Button,
  Dropdown,
  Spinner,
  Badge,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { orderDelete, orderUpdateStatus } from "./orderSlice";

export default function OrdersList() {
  const dispatch = useDispatch();
  const {
    data: orders,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.order);
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.product);
  const { data: admin } = useSelector((state) => state.auth);

  const [selectedOrderStatus, setSelectedOrderStatus] = useState("All");
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const handleShipped = async (id) => {
    if (!id) {
      return;
    }
    try {
      const response = await dispatch(
        orderUpdateStatus({ id, status: "Shipped" })
      ).unwrap();
      if (response) {
        console.log("Order shipped successfully");
      }
    } catch (error) {
      console.log("Error shipping order", error);
    }
  };

  const handleConfirmed = async (id) => {
    try {
      const response = await dispatch(
        orderUpdateStatus({ id: id, status: "Confirmed" })
      ).unwrap();
      if (response) {
        console.log("Order confirmed successfully");
      }
    } catch (error) {
      console.log("Error confirming order", error);
    }
  };

  const setSelectedCategory = (order) => {
    setSelectedOrderStatus(order);
    if (order === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((o) => o.status === order));
    }
  };

  const handleCancelOrder = async (id) => {
    try {
      const response = await dispatch(orderDelete(id)).unwrap();
      if (response) {
        console.log("Order cancelled successfully");
      }
    } catch (error) {
      console.log("Error cancelling order", error);
    }
  };

  if (ordersLoading || productsLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" />
      </div>
    );
  }

  const getProductName = (productId) => {
    const product = products.find((product) => product._id == productId);
    return product ? product.productName : "Unknown Product";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return (
          <Badge bg="warning" text="dark">
            {status}
          </Badge>
        );
      case "Confirmed":
        return <Badge bg="info">{status}</Badge>;
      case "Shipped":
        return <Badge bg="success">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="container">
      {ordersError && <Alert variant="danger">{ordersError}</Alert>}
      {productsError && <Alert variant="danger">{productsError}</Alert>}
      <h2>Sort by: </h2>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selectedOrderStatus}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSelectedCategory("All")}>
            All
          </Dropdown.Item>
          {["Confirmed", "Shipped", "Pending"].map((status) => (
            <Dropdown.Item
              key={status}
              onClick={() => setSelectedCategory(status)}
            >
              {status}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      {filteredOrders.length === 0 ? (
        <h2>No orders found</h2>
      ) : (
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Order ID</th>
              {admin.isAdmin && <th>User</th>}
              <th>Products</th>
              <th>Total Cost</th>
              <th>Details</th>
              <th>Delivery Method</th>
              <th>Status</th>
              <th>Creation Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>
                  {admin.isAdmin ? (
                    <Link
                      to={`/orders/${order._id}`}
                      className="text-decoration-none"
                    >
                      {order._id.slice(0, 8)}...
                    </Link>
                  ) : (
                    order._id.slice(0, 8) + "..."
                  )}
                </td>
                {admin.isAdmin && (
                  <td>
                    <Link
                      to={`/users/${order.userId}`}
                      className="text-decoration-none"
                    >
                      {order.userId.slice(0, 8) + "..."}
                    </Link>
                  </td>
                )}
                <td>
                  <ul>
                    {order.products.map((product) => (
                      <li key={product.productId}>
                        {product.quantity} x{" "}
                        <Link
                          to={`/products/${product.productId}`}
                          className="text-decoration-none"
                        >
                          {getProductName(product.productId)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </td>
                <td>${order.totalCost}</td>
                <td
                  style={{
                    width: "150px",
                  }}
                >
                  <ul>
                    <li>{order.pickupDetails.address}</li>
                    <li>{order.pickupDetails.contactNumber}</li>
                  </ul>
                </td>
                <td>{order.pickupDetails.deliveryMethod}</td>
                <td>{getStatusBadge(order.status)}</td>
                <td>{new Date(order.createDate).toLocaleDateString()}</td>
                <td>
                  {admin.isAdmin && order.status === "Pending" && (
                    <Button
                      variant="primary"
                      onClick={() => handleShipped(order._id)}
                    >
                      Confirm Shipment
                    </Button>
                  )}
                  {!admin.isAdmin && order.status === "Shipped" && (
                    <Button
                      variant="success"
                      onClick={() => handleConfirmed(order._id)}
                    >
                      Confirm Delivery
                    </Button>
                  )}
                  {!admin.isAdmin && order.status === "Pending" && (
                    <Button
                      variant="danger"
                      onClick={() => handleCancelOrder(order._id)}
                    >
                      Cancel Order
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
