import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginFrom from "./components/login/loginForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginFrom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
