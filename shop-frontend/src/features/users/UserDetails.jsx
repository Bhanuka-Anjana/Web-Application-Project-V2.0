import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./userDetail.css";
import defaultProfile from "../../assets/default/user.png";

export default function UserDetails() {
  const { id } = useParams();
  const { data: users } = useSelector((state) => state.user);
  const allOrders = useSelector((state) => state.order.data);
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setUser(users.find((user) => user._id === id));
    setOrders(allOrders.filter((order) => order.userId === id));
  }, [id]);

  return (
    <div className="user-detail">
      <Col>
        <Card className="mx-4">
          <Card.Header>
            <h1>User Details</h1>
          </Card.Header>
          {user?.profilePicturePath ? (
            <Card.Img src={user.profilePicturePath} style={
              {
                width: "30%",
                margin: "auto",
                marginTop: "10px",
              }
            
            }/>
          ) : (
            <Card.Img src={defaultProfile} style={{
              width: "30%",
              margin: "auto",
              marginTop: "10px",
            }}/>
          )}
          <Card.Body>
            <Card.Title>{user.firstName + " "+ user.lastName}</Card.Title>
            <Card.Text>
              <strong>Email:</strong> {user.email}
            </Card.Text>
            <Card.Text>
              <strong>Admin:</strong> {user.isAdmin ? "Yes" : "No"}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Header>
            <h1>Orders</h1>
          </Card.Header>
          <Card.Body>
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>${order.totalCost}</td>
                    <td>{order.status}</td>
                    <td>
                      <Link to={`/orders/${order._id}`}>Details</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
}
