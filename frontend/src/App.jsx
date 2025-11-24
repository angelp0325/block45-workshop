import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", margin: "20px" }}>
        <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
