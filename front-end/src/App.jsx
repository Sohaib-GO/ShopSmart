import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Homepage from "./pages/homepage/Homepage";
import SearchItems from "./pages/searchItems/SearchItems";
import Listings from "./pages/listings/Listings";

function App() {
  const [listings, setListings] = useState([]);

  console.log(listings);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/searchItems"
            element={<SearchItems setListings={setListings} />}
          />
          <Route
            path="/listings"
            element={<Listings setListings={setListings} listings={listings} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
