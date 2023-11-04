import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { paginate } from "./../utils/paginate";
import { getCategories } from "../services/categoryService";
import { deleteProduct, getProducts } from "../services/productService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

class Products extends Component {
  state = {
    products: [],
    categories: [],
    currentPage: 1,
    pageSize: 8,
    selectedCategory: { _id: "", name: "All Categories" },
  };

  handleDelete = async (product) => {
    //revert back to previous state
    const originalProducts = this.state.products;

    const products = originalProducts.filter((p) => p._id !== product._id);
    this.setState({ products });

    try {
      await deleteProduct(product._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This product has already been deleted.");

      this.setState({ products: originalProducts });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category, currentPage: 1 });
  };

  async componentDidMount() {
    const {data} = await getCategories();
    const categories = [{ _id: "", name: "All Categories" }, ...data]
    const {data : products} = await getProducts();
    this.setState({ products, categories });
  }

  render() {
    const {
      pageSize,
      currentPage,
      selectedCategory,
      products: allProducts,
    } = this.state;

    if (allProducts.length === 0)
      return <p>There are no products in the database.</p>;
    const filltered =
      selectedCategory && selectedCategory._id
        ? allProducts.filter((p) => p.categoryId === selectedCategory._id)
        : allProducts;
    const products = paginate(filltered, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-2 d-flex justify-content-center mt-5 mr-5">
          <ListGroup
            items={this.state.categories}
            textProperty={"name"}
            valueProperty={"_id"}
            selectedItem={selectedCategory}
            onItemSelect={this.handleCategorySelect}
          />
        </div>
        <div className="col">
          <Link
            to="/products/new"
            className="btn btn-primary mt-3"
            style={{ marginBottom: 20 }}
          >
            New Product
          </Link>
          <p>Showing {allProducts.length} products in the database.</p>
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
                  <td>
                    <Link to={`/products/${product._id}`}>
                      {product.productName}
                    </Link>
                  </td>
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
          <div className="d-flex justify-content-center mt-5">
            <Pagination
              itemsCount={filltered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
