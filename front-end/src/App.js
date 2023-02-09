import './App.css';
import React, { useState, useEffect } from 'react';
import Listings from './pages/listings/Listings';
import Items from './components/items/items';
import Register from './components/authentication/register';
import Login from './components/authentication/login';
import FetchGroceryList from './components/Grocery_List/GroceryList';
import Maps from "./pages/map/Maps";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return (
    <div className="App">
    {/* <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
  <Items isLoggedIn={isLoggedIn} />
  <FetchGroceryList isLoggedIn={isLoggedIn} /> */}
  <Maps />

    </div>
  );
}

export default App;
