import { useState } from "react";
import "../style/Auth.css";
import axios from "axios";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await  axios.post("https://soulcart-backend.onrender.com/api/auth/register",  {
          name,
          email,
          password,
          phone: Number(phone),
          address,
          city,
          state,
          pincode
        }
      );

      console.log("Registered!", response.data);
      alert("✅ Account created! Please login.");
      window.location.href = "/login";

    } catch (err) {
      console.error("Register failed:", err);
      setError("Registration failed. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2 className="text-center mb-4">Create SoulCart Account</h2>

        {error && (
          <div className="alert alert-danger">{error}</div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Row 1 - Name & Email */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="mb-3" style={{ flex: 1 }}>
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ flex: 1 }}>
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row 2 - Password & Phone */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="mb-3" style={{ flex: 1 }}>
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="mb-3" style={{ flex: 1 }}>
              <label>Phone</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row 3 - Address & City */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="mb-3" style={{ flex: 1 }}>
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ flex: 1 }}>
              <label>City</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Row 4 - State & Pincode */}
          <div style={{ display: "flex", gap: "12px" }}>
            <div className="mb-3" style={{ flex: 1 }}>
              <label>State</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
            <div className="mb-3" style={{ flex: 1 }}>
              <label>Pincode</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center mt-3">
            Already have an account?{" "}
            <a href="/login" style={{ color: "black", fontWeight: "bold" }}>
              Login
            </a>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;