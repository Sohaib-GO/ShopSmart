import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Homepage from "./pages/homepage/Homepage";
import Listings from "./pages/listings/Listings";

function App() {
  const [savedItems, setSavedItems] = useState([]);

  console.log(savedItems);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/listings"
            element={<Listings setSavedItems={setSavedItems} />}
          />
          <Route
            path="/saved-items"
            // element={<SavedItems savedItems={savedItems} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
