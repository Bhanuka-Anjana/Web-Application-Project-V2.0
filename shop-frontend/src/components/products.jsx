import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "./../utils/paginate";
import { getCategories } from "../services/categoryService";
import { getProducts } from "../services/productService";

class Products extends Component {
  state = {
    products: [],
    categories: [],
    currentPage: 1,
    pageSize: 4,
    selectedCategory: {},
  };

  handleDelete = (product) => {
    const products = this.state.products.filter((p) => p._id !== product._id);
    this.setState({ products });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category, currentPage: 1 });
  };

  async componentDidMount() {
    const { data } = await getCategories();
    const categories = [{ _id: "", name: "All Categories" }, ...data];

    const { data: products } = await getProducts();
    this.setState({ products, categories });


  }

  render() {
    const {
      length,
      pageSize,
      currentPage,
      selectedCategory,
      products: allProducts,
    } = this.state;

    if (length === 0) return <p>There are no products in the database.</p>;
    const filltered =
      selectedCategory && selectedCategory._id
        ? allProducts.filter((p) => p.category._id === selectedCategory._id)
        : allProducts;
    const products = paginate(filltered, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.categories}
            textProperty={'name'}
            selectedItem={selectedCategory}
            onItemSelect={this.handleCategorySelect}
          />
        </div>
        <div className="col">
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
                  <td>{product.categoryId}</td>
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
            itemsCount={filltered.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Products;
