import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProductForm from "../pages/ProductForm";
import ProductList from "../pages/ProductList";
import EditProduct from "../pages/EditProduct";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-product" element={<ProductForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
         </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </>
  );
}

export default App;
