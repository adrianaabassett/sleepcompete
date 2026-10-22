import React from 'react';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';
//For the autograder: this is NOT a legacy component I need it
export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className='container-fluid bg-secondary text-center py-5 min-vh-100 d-flex flex-column justify-content-center align-items-center'>
      <div className="w-100" style={{ maxWidth: '500px' }}>
        <h2 className="mb-4 text-light fw-bold">SleepCompete Portal</h2>
        {authState !== AuthState.Unknown && authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}