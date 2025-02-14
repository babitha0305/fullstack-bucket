import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [bucketName, setBucketName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/create-bucket/', {
        bucket_name: bucketName,
      });
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setMessage(`Error: ${error.response.data.detail}`);
      } else if (error.request) {
        // The request was made but no response was received
        setMessage('Error: No response received from server.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setMessage(`Error: ${error.message}`);
      }
    }
  };
  

  return (
    <div>
      <h1>Create S3 Bucket</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={bucketName}
          onChange={(e) => setBucketName(e.target.value)}
          placeholder="Enter bucket name"
          required
        />
        <button type="submit">Create Bucket</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
