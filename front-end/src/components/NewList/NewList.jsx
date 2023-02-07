import React, { useState } from 'react';

function NewListForm() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
      });
      const data = await response.json();

      if (data.error) {
        setError(data.error);
        throw new Error(data.error);
      }

      setName('');
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <button type="submit">Create List</button>
      </form>
    </>
  );
}

export default NewListForm;
