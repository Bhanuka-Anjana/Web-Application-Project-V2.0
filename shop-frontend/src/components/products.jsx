import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from './../utils/paginate';

class Products extends Component {
  state = {
    products: [],
    categories: [],
    currentPage: 1,
    pageSize: 4
  };

  handleDelete = (product) => {
    const products = this.state.products.filter((p) => p._id !== product._id);
    this.setState({ products });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  render() {
    const { length , pageSize, currentPage , products: allProducts } = this.state.products;

    if (length === 0) return <p>There are no products in the database.</p>;
const products = paginate(allProducts,currentPage,pageSize);
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
            {products.map((product) => (
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
        <Pagination
            itemsCount={length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
      </React.Fragment>
    );
  }
}

export default Products;
