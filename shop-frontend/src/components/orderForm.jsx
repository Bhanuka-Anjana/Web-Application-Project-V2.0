import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getProducts } from "../services/productService";
import { saveOrder } from "../services/orderService";
import { getCurrentUser } from "../services/authService";

class OrderForm extends Form {
  state = {
    data: {
      quantity: 1,
      productName: "",
    },
    products: [],
    errors: {},
  };

  schema = {
    quantity: Joi.number().min(1).max(50).required().label("Quantity"),
    productName: Joi.string().required().label("Product"),
  };

  doSubmit = async () => {
    const userId = getCurrentUser()["_id"];
    const data ={
      userId, 
      productId: this.state.data.productName,
      quantity: this.state.data.quantity
    }
    console.log(data);
    await saveOrder(data);
    this.props.history.push("/orders");
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });

    try {
      const productId = this.props.match.params.id;
      // Initiate a new form without filling data
      if (productId === "new") return;

      // const { data: product } = await getProduct(productId);
      // const data = {
      //   _id: product[0]._id,
      //   productName: product[0].productName,
      //   categoryId: product[0].categoryId,
      //   numberInStock: product[0].numberInStock,
      //   unitPrice: product[0].unitPrice,
      // };
      // this.setState({ data });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  render() {
    const { products } = this.state;
    return (
      <div>
        <h1>New Order Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderSelect("productName", "Products", products)}
          {this.renderInput("quantity", "Quantity", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default OrderForm;
