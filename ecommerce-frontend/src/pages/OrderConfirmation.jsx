import { useEffect, useState } from "react";

function OrderConfirmation() {
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("lastPayment");
    if (data) setPayment(JSON.parse(data));
  }, []);

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ maxWidth: "500px", textAlign: "center" }}>

        <div style={{ fontSize: "60px", marginBottom: "16px" }}>🎉</div>
        <h2 className="mb-2">Order Confirmed!</h2>
        <p style={{ color: "gray", marginBottom: "20px" }}>
          Thank you for shopping with SoulCart
        </p>

        {payment && (
          <div style={{
            background: "#f8f8f8",
            borderRadius: "10px",
            padding: "16px",
            textAlign: "left",
            marginBottom: "20px"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "gray" }}>Transaction ID</span>
              <span style={{ fontWeight: "bold", fontSize: "13px" }}>{payment.transactionId}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "gray" }}>Amount Paid</span>
              <span style={{ fontWeight: "bold" }}>₹{payment.amount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ color: "gray" }}>Payment Method</span>
              <span>{payment.paymentMethod}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "gray" }}>Status</span>
              <span style={{ color: "green", fontWeight: "bold" }}>✅ {payment.status}</span>
            </div>
          </div>
        )}

        <button
          className="btn btn-dark w-100"
          onClick={() => window.location.href = "/products"}
        >
          Continue Shopping
        </button>

      </div>
    </div>
  );
}

export default OrderConfirmation;