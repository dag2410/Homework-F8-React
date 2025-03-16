import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import NewProduct from "./pages/NewProduct/index";
import Products from "./pages/Products/index";
import Search from "./pages/Search/index";
import "../Day-41/style.css";

export default function App() {
  return (
    <BrowserRouter>
      {/* navbar */}
      <nav className="navbar navbar-expand-lg bg-info">
        <div className="container">
          <div id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/new-product">
                  New Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/new-product" element={<NewProduct />} />
        <Route path="/products" element={<Products />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}
