import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './app/App'
import { Provider } from 'react-redux'
import store from './app/Store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToastContainer />
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>,
)
