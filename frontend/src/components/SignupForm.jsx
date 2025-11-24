import React, { useState } from "react";
import axios from "../api/axiosConfig";

function SignupForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "customer",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/signup", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error during signup");
    }
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignupForm;
