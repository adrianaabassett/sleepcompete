import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(null);

  async function handleLogin() {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userName, password }),
    });

    if (response.ok) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`Login failed: ${body.msg}`);
    }
  }

  async function handleCreate() {
    if (!userName || !password) {
      setDisplayError('Please enter both a username and password.');
      return;
    }

    const response = await fetch('/api/auth/create', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userName, password }),
    });

    if (response.ok) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`Registration failed: ${body.msg}`);
    }
  }

  return (
    <div className="card bg-dark text-light p-4 border-secondary mx-auto shadow" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3">Login / Sign Up</h3>
      <div className='input-group mb-3'>
        <span className='input-group-text bg-secondary text-light border-secondary'>@</span>
        <input 
          className='form-control bg-dark text-light border-secondary' 
          type='text' 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          placeholder='Username' 
        />
      </div>
      <div className='input-group mb-3'>
        <span className='input-group-text bg-secondary text-light border-secondary'>🔒</span>
        <input 
          className='form-control bg-dark text-light border-secondary' 
          type='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder='Password' 
        />
      </div>
      <div className="d-flex gap-2 justify-content-center">
        <Button variant='warning' className="w-50 fw-bold" onClick={handleLogin} disabled={!userName || !password}>
          Login
        </Button>
        <Button variant='outline-light' className="w-50" onClick={handleCreate} disabled={!userName || !password}>
          Create
        </Button>
      </div>
      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </div>
  );
}