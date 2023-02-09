import './App.css';
import React, { useState, useEffect } from 'react';
import Listings from './pages/listings/Listings';
import Items from './components/items/items';
import Register from './components/authentication/register';
import Login from './components/authentication/login';
import FetchGroceryList from './components/Grocery_List/GroceryList';

function App() {


  return (
    <div className="App">
    <Login  />
  {/* <Items isLoggedIn={isLoggedIn} /> */}
  <FetchGroceryList  />

    </div>
  );
}

export default App;
