import React, {Component} from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registrationForm";
import ProductForm from "./components/productForm";

class App extends Component {
  render() { 
    return (<React.Fragment>
      <Routes>
        <Route path="/" Component={ProductForm}/>
        <Route path="/login" Component={LoginForm}/>
        <Route path="/register" Component={RegisterForm}/>
      </Routes>
    </React.Fragment>);
  }
}
 
export default App;

