import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import axios from "axios";

function Products() {
  const [products,setProducts] = useState([]);
  const tempProducts = getProducts();
  tempProducts && setProducts(tempProducts);
  return (
    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp"
            class="card-img-top"
            alt="Hollywood Sign on The Hill"
          />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const getProducts = async () => {
  try {
    const resposnse = await axios.get("http://localhost:8080/api/products");
    if (resposnse.status === 200) {
      return Response.data;
    }
  } catch (err) {
    console.log("eorrrooo", err);
  }
};

export default Products;
