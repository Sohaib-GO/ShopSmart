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
    <div>
      {backendData ? (
        <ul>
          {backendData.map(user => (
            <li key={user.id}>
              {user.name}, {user.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
  }

export default App;
