import { useState } from "react";
import axios from "axios";
import "../style/Auth.css";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("Credit/Debit Card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const totalAmount = localStorage.getItem("totalAmount") || 0;

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");

    try {
      const response = await 
       axios.post("https://soulcart-backend.onrender.com/api/payments/pay", 
        {
          userId: Number(userId),
          amount: Number(totalAmount),
          paymentMethod
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const result = response.data;

      if (result.status === "SUCCESS") {
        localStorage.setItem("lastPayment", JSON.stringify(result));
        window.location.href = "/order-confirmation";
      } else {
        setError("❌ Payment failed. Please try again.");
      }

    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    marginTop: "4px",
    background: "white"
  };

  const methods = ["Credit/Debit Card", "UPI", "Net Banking", "Cash on Delivery"];
  const icons = {
    "Credit/Debit Card": "💳",
    "UPI": "📱",
    "Net Banking": "🏦",
    "Cash on Delivery": "💵"
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "480px" }}>

        <h2 className="text-center mb-3">💳 Payment</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Order Summary */}
        <div style={{
          background: "#f8f8f8",
          borderRadius: "10px",
          padding: "12px 16px",
          marginBottom: "16px"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "gray" }}>Total Amount</span>
            <span style={{ fontWeight: "bold", fontSize: "20px" }}>₹{totalAmount}</span>
          </div>
        </div>

        {/* Payment Methods - 2 columns */}
        <label style={{ fontWeight: "bold", marginBottom: "10px", display: "block" }}>
          Select Payment Method
        </label>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
          {methods.map((method) => (
            <div
              key={method}
              onClick={() => setPaymentMethod(method)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                padding: "14px 10px",
                border: paymentMethod === method ? "2px solid black" : "1px solid #ddd",
                borderRadius: "10px",
                cursor: "pointer",
                background: paymentMethod === method ? "#f0f0f0" : "white",
                transition: "all 0.2s",
                textAlign: "center"
              }}
            >
              <span style={{ fontSize: "24px" }}>{icons[method]}</span>
              <span style={{ fontSize: "13px", fontWeight: paymentMethod === method ? "600" : "400" }}>
                {method}
              </span>
            </div>
          ))}
        </div>

        {/* Credit/Debit Card Fields */}
        {paymentMethod === "Credit/Debit Card" && (
          <div style={{ background: "#f8f8f8", borderRadius: "10px", padding: "16px", marginBottom: "12px" }}>
            <div className="mb-3">
              <label style={{ fontSize: "14px", fontWeight: "600" }}>Card Number</label>
              <input
                style={inputStyle}
                type="text"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                value={cardNumber}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").substring(0, 16);
                  const formatted = val.match(/.{1,4}/g)?.join(" ") || val;
                  setCardNumber(formatted);
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "14px", fontWeight: "600" }}>Expiry</label>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={expiry}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "").substring(0, 4);
                    const formatted = val.length > 2 ? val.slice(0, 2) + "/" + val.slice(2) : val;
                    setExpiry(formatted);
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "14px", fontWeight: "600" }}>CVV</label>
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="***"
                  maxLength={3}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>
          </div>
        )}

        {/* UPI Fields */}
        {paymentMethod === "UPI" && (
          <div style={{ background: "#f8f8f8", borderRadius: "10px", padding: "16px", marginBottom: "12px" }}>
            <label style={{ fontSize: "14px", fontWeight: "600" }}>UPI ID</label>
            <input
              style={inputStyle}
              type="text"
              placeholder="yourname@upi"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {/* Net Banking Fields */}
        {paymentMethod === "Net Banking" && (
          <div style={{ background: "#f8f8f8", borderRadius: "10px", padding: "16px", marginBottom: "12px" }}>
            <label style={{ fontSize: "14px", fontWeight: "600" }}>Select Bank</label>
            <select
              style={inputStyle}
              value={bank}
              onChange={(e) => setBank(e.target.value)}
            >
              <option value="">-- Select your bank --</option>
              <option>State Bank of India</option>
              <option>HDFC Bank</option>
              <option>ICICI Bank</option>
              <option>Axis Bank</option>
              <option>Kotak Mahindra Bank</option>
              <option>Punjab National Bank</option>
              <option>Bank of Baroda</option>
            </select>
          </div>
        )}

        {/* Cash on Delivery */}
        {paymentMethod === "Cash on Delivery" && (
          <div style={{
            background: "#f8f8f8",
            borderRadius: "10px",
            padding: "16px",
            marginBottom: "12px",
            textAlign: "center",
            color: "gray"
          }}>
            💵 Pay when your order arrives at your doorstep.
          </div>
        )}

        {/* Buttons */}
        <button
          className="btn btn-dark w-100 mt-2"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing Payment..." : `Pay ₹${totalAmount}`}
        </button>

        <button
          className="btn btn-outline-secondary w-100 mt-2"
          onClick={() => window.location.href = "/cart"}
        >
          ← Back to Cart
        </button>

      </div>
    </div>
  );
}

export default Payment;