import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getCategories } from "../services/categoryService";
import { getProduct, saveProduct } from "../services/productService";

class ProductForm extends Form {
  state = {
    data: {
      productName: "",
      numberInStock: "",
      unitPrice: "",
      categoryId: "",
    },
    categories: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    productName: Joi.string().min(3).required().label("Product Name"),
    numberInStock: Joi.number().min(0).max(1000).required().label("Stock"),
    unitPrice: Joi.number().min(0).max(1000).required().label("Unit Price"),
    categoryId: Joi.required().label("Category"),
  };

  doSubmit = async () => {
    await saveProduct(this.state.data);
    this.props.history.push("/products");
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });

    try {
      const productId = this.props.match.params.id;
      // Initiate a new form without filling data
      if (productId === "new") return;

      const { data: product } = await getProduct(productId);
      const data = {
        _id: product[0]._id,
        productName: product[0].productName,
        categoryId: product[0].categoryId,
        numberInStock: product[0].numberInStock,
        unitPrice: product[0].unitPrice,
      };
      this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  render() {
    return (
      <div>
        <h1>New Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("productName", "Product Name")}
          {this.renderSelect("categoryId", "Category", this.state.categories)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("unitPrice", "Unit Price", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ProductForm;
