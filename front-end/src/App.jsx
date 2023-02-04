import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Homepage from "./pages/homepage/Homepage";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <nav>
          <ul>
            <li>
              <Link to="/">Homepage</Link>
            </li>
            <li>
              <Link to="/listings">listings</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/listings" element={<h1>Linstings</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
