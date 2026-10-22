import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(null);

  // Hash password using SHA-256
  async function hashPassword(str) {
    const msgUint8 = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function getUsers() {
    const users = localStorage.getItem('sleepCompeteUsers');
    return users ? JSON.parse(users) : {};
  }

  async function handleLogin() {
    const users = getUsers();
    const hashedPassword = await hashPassword(password);

    if (users[userName]) {
      if (users[userName] === hashedPassword) {
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        setDisplayError('Incorrect password. Please try again.');
      }
    } else {
      setDisplayError('Username does not exist. Please create an account first.');
    }
  }

  async function handleCreate() {
    const users = getUsers();

    if (users[userName]) {
      setDisplayError('Username is already taken. Please choose another one.');
      return;
    }

    if (!userName || !password) {
      setDisplayError('Please enter both a username and password.');
      return;
    }

    const hashedPassword = await hashPassword(password);
    users[userName] = hashedPassword;
    localStorage.setItem('sleepCompeteUsers', JSON.stringify(users));
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
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