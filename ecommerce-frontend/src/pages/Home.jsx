import { useEffect, useState } from "react";
import { getProducts } from "../service/ProductService";
import "../style/Home.css";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
};

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <Link className="navbar-brand fw-bold" to="/">SoulCart</Link>

        <div className="ms-auto">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>

            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="hero-section">
        <h1>Welcome to SoulCart</h1>
        <p>Your one stop shop for amazing products</p>
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Products</h2>

        <div className="row">
          {products.slice(0, 6).map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card product-card">
                <img
                  src={p.image}
                  className="card-img-top"
                  alt={p.productName}
                />
                <div className="card-body text-center">
                  <h5>{p.productName}</h5>
                  <p className="text-muted">{p.productDescription}</p>
                  <p className="price">₹ {p.productPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;