import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Homepage from "./pages/homepage/Homepage";
import About from "./pages/about/About";
import SearchItems from "./pages/searchItems/SearchItems";
import Listings from "./pages/listings/Listings";
import Map from "./pages/map/Map";
import Register from "./components/authentication/register";
import DistanceTime from "./pages/map/CalculateDis";

function App() {
  const [listings, setListings] = useState([]);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/search-items"
            element={<SearchItems setListings={setListings} />}
          />
          <Route
            path="/listings"
            element={<Listings setListings={setListings} listings={listings} />}
          />
          <Route path="/map" element={<Map />} />

          <Route path="/register" element={<Register />} />
          <Route path="/routing" element={<DistanceTime />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
