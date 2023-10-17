import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class ProductForm extends Form {
  state = {
    data: {
      productName: "",
      categoryId: "",
      numberInStock: "",
      unitPrice: "",
    },
    categories: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    productName: Joi.string().min(3).required().label("Product Name"),
    numberInStock: Joi.number().min(0).required().label('Stock'),
    unitPrice: Joi.number().min(0).required().label('Unit Price'),
    categoryId: Joi.required().label('Category'),
  };


  doSubmit =() => {

  };
  componentDidMount(){
    this.setState.categories = {}
  }

  render() {
    return (
      <div>
        <h1>New Product Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("productName", "Product Name")}
          {this.renderSelect("categoryId", "Category", this.state.categories)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("unitPrice", "Unit Price", 'number')}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ProductForm;
