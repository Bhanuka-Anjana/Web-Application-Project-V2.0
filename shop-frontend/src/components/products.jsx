import React, { Component } from "react";

class Products extends Component {
  state = {
    products: []
  };

  handleDelete = product => {
    const products = this.state.products.filter(p => p._id !== product._id);
    this.setState({ products });
  };

  render() {
    const { length } = this.state.products;

    if (length === 0) return <p>There are no products in the database.</p>;

    return (
      <React.Fragment>
        <p>Showing {length} products in the database.</p>
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Unit Price</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.products.map(product => (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{product.category.name}</td>
                <td>{product.numberInStock}</td>
                <td>{product.unitPrice}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(product)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Products;
