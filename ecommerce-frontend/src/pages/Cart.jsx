import { useEffect, useState } from "react";
import { getCartItems, removeItem } from "../service/CartService";
import "../style/Cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = 1; 
    getCartItems(userId)
      .then((res) => {
        console.log("Data received successfully");
        setCartItems(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch Error:", err);
        setCartItems([]);
        setLoading(false);
      });
  }, []);

  const handleRemove = (cartItemId) => {
    removeItem(cartItemId)
      .then(() => {
        setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      })
      .catch(err => console.error("Remove Error:", err));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.product?.productPrice || 0) * (item.quantity || 0),
    0
  );

  const handleCheckout = () => {
    localStorage.setItem("totalAmount", totalPrice);
    window.location.href = "/payment";
  };

  if (loading) return <div className="text-center mt-5">Loading your SoulCart...</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your SoulCart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <h4 className="text-muted">Your cart is empty</h4>
          <a href="/" className="btn btn-outline-dark mt-3">Continue Shopping</a>
        </div>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div className="cart-item shadow-sm p-3 mb-3 bg-white rounded d-flex align-items-center" key={item.id}>
              <img
                src={item.product?.image || "https://via.placeholder.com/100"}
                alt={item.product?.productName}
                style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
              />

              <div className="cart-details ms-3 flex-grow-1">
                <h5 className="mb-0">{item.product?.productName || "Product Name"}</h5>
                <p className="mb-0 text-success fw-bold">₹ {item.product?.productPrice || 0}</p>
                <small className="text-muted">Quantity: {item.quantity}</small>
              </div>

              <div className="text-end">
                <p className="fw-bold mb-2">₹ {(item.product?.productPrice || 0) * item.quantity}</p>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-total mt-4 p-4 bg-light border rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Total Amount:</h4>
              <h4 className="text-success mb-0">₹ {totalPrice}</h4>
            </div>
            <button
              className="btn btn-dark w-100 mt-3 py-2 fw-bold"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;