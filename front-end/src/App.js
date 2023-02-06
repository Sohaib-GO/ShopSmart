import './App.css';
import React, { useState, useEffect } from 'react';
import NewListForm from './components/NewList/NewList';
import Listings from './pages/listings/Listings';

function App() {



  return (
    <div className="App">
<NewListForm />
    <Listings />
    </div>
  );
}

export default App;
