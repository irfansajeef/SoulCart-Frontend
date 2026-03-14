import { useEffect, useState } from "react";
import { getProducts } from "../service/ProductService";
import { addToCart } from "../service/CartService";
import "../style/product.css";
import { Link, useNavigate } from "react-router-dom";

function Product() {
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
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = (product) => {
    const userId = Number(localStorage.getItem("userId"));
    
    const cartItemRequest = {
      quantity: 1,
      product: { id: product.id },
      cart: { user: { id: userId } }
    };

    addToCart(cartItemRequest)
      .then((res) => {
        console.log("Added to cart:", res.data);
        alert(`✅ ${product.productName} added to cart!`);
      })
      .catch((err) => {
        console.error("Cart Error:", err.response?.data || err.message);
        alert("❌ Failed to add to cart. Check console for details.");
      });
  };

  return (
    <div>
      {/* NAVBAR */}
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

      {/* PRODUCTS */}
      <div className="container mt-4">
        <h2 className="text-center mb-4">All Products</h2>

        <div className="row">
          {products.map((p) => (
            <div key={p.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image || "https://via.placeholder.com/250"}
                  className="card-img-top"
                  alt={p.productName}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.productName}</h5>
                  <p className="card-text text-muted">{p.productDescription}</p>
                  <p className="fw-bold text-success">₹ {p.productPrice}</p>
                  <button
                    className="btn btn-dark mt-auto"
                    onClick={() => handleAddToCart(p)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;