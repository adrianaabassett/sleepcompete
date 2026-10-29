import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch('/api/auth/logout', { method: 'DELETE' })
      .catch(() => {
        // Logout failed. Assuming offline.
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <div className="p-4 bg-dark rounded border border-secondary text-light shadow">
      <h3 className="mb-3">Welcome back, <span className="text-warning">{props.userName}</span>!</h3>
      <div className="d-flex justify-content-center gap-2">
        <Button variant="warning" onClick={() => navigate('/')}>
          Go to Dashboard
        </Button>
        <Button variant="outline-light" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}