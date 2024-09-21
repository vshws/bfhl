import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState('');        // State to store input data
  const [response, setResponse] = useState(null); // State to store backend response
  const [error, setError] = useState(null);    // State to store error messages

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const parsedData = data.split(',').map(item => item.trim()); // Split input into array
      const res = await axios.post('https://bfhlser.up.railway.app/bfhl', { data: parsedData });
      setResponse(res.data); // Set backend response
      setError(null); // Clear any previous error
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error connecting to server');
      setResponse(null); // Clear previous success response
    }
  };

  return (
    <div className="App">
      <h1>Backend Interaction with React</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Data (comma separated values):
          <input
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Example: 1, A, b, 3, C"
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* Display the response */}
      {response && (
        <div>
          <h2>Response</h2>
          <p><strong>Success:</strong> {response.is_success.toString()}</p>
          <p><strong>Numbers:</strong> {response.numbers.join(', ')}</p>
          <p><strong>Alphabets:</strong> {response.alphabets.join(', ')}</p>
          <p><strong>Highest Alphabet:</strong> {response.highest_alphabet}</p>
        </div>
      )}

      {/* Display the error */}
      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
