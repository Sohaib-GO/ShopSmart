import './App.css';
import React, { useState, useEffect } from 'react';
import NewListForm from './components/NewList/NewList';
import Listings from './pages/listings/Listings';
import Items from './components/items/items';
import Register from './authentication/register';
import Login from './authentication/login';
function App() {



  return (
    <div className="App">
    <Login />
    <NewListForm />
    </div>
  );
}

export default App;
