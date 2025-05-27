import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/users`).then(res => setUsers(res.data));
  }, []);

  const addUser = async () => {
    const res = await axios.post(`${API_URL}/users`, { name });
    setUsers([...users, res.data]);
    setName('');
  };

  return (
    <div>
      <h1>Users</h1>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={addUser}>Add User</button>
      <ul>{users.map(user => <li key={user.id}>{user.name}</li>)}</ul>
    </div>
  );
}

export default App;
