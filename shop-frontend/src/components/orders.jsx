import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import { Link } from "react-router-dom";
import { getOrders } from "./../services/orderService";

class Orders extends Component {
  state = {
    orders: [],
    currentPage: 1,
    pageSize: 4,
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  async componentDidMount() {
    const { data: orders } = await getOrders();
    this.setState({ orders });
  }

  render() {
    const { pageSize, currentPage, orders: allOrders } = this.state;
    if (allOrders.length === 0)
      return (
        <>
          <p>There are no orders in the database.</p>
          <Link
            to="/orders/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Order
          </Link>
        </>
      );

    const orders = paginate(allOrders, currentPage, pageSize);
    return (
      <>
        <Link
          to="/orders/new"
          className="btn btn-primary my-3"
          style={{ marginBottom: 20 }}
        >
          New Order
        </Link>
        <p>Showing {orders.length} Orders in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.product.productName}</td>
                <td>{order.product.unitPrice}</td>
                <td>{order.quantity}</td>
                <td>{order.createDate}</td>
                <td>{order.totalCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={orders.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </>
    );
  }
}

export default Orders;
