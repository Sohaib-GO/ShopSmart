import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [backendData, setBackendData] = useState(null);

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setBackendData(data));
  }, []);



  return (
    <div className="App">
      <h2>Backend Data</h2>
{ (backendData) ? backendData.user.map((user, index) => <p key={index}>{user}</p>) : <p>Loading...</p> }
    </div>
  );
}

export default App;
