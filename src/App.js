import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState(null);
  const [people, setPeople] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Get API URL from environment variable
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    // Test API connection
    fetch(`${API_URL}api/health/`)
      .then(response => response.json())
      .then(data => {
        setApiStatus(data);
        console.log('Backend connected:', data);
      })
      .catch(error => {
        console.error('Backend connection failed:', error);
        setApiStatus({ status: 'error', message: 'Connection failed' });
      });
  }, [API_URL]);

  const addPerson = (personData) => {
    fetch(`${API_URL}/api/people/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(personData),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Refresh people list or add to state
        console.log('Person added:', data);
      }
    })
    .catch(error => console.error('Error adding person:', error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dummy Full Stack App</h1>
        <p>React Frontend + Django Backend + MongoDB</p>
        
        <div className="status-cards">
          <div className="card">
            <h3>Frontend</h3>
            <p>✅ React Running</p>
          </div>
          <div className="card">
            <h3>Backend</h3>
            <p>{apiStatus ? 
              (apiStatus.status === 'ok' ? '✅ Django Connected' : '❌ Connection Failed') 
              : '⏳ Connecting...'}</p>
          </div>
          <div className="card">
            <h3>Database</h3>
            <p>{apiStatus?.mongodb?.connected ? '✅ MongoDB Connected' : '🔄 MongoDB Ready'}</p>
          </div>
        </div>

        {apiStatus && (
          <div className="api-info">
            <h3>API Status:</h3>
            <pre>{JSON.stringify(apiStatus, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
