import React, {Component} from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/login";

class App extends Component {
  render() { 
    return (<React.Fragment>
      <Routes>
        <Route path="/" Component={LoginForm}/>
      </Routes>
    </React.Fragment>);
  }
}
 
export default App;

