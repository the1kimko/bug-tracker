import React, { useState, useEffect } from 'react';
import './index.css';
import ErrorBoundary from './components/ErrorBoundary';
import AuthForm from './components/AuthForm';
import BugDashboard from './components/BugDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
        {!isAuthenticated ? (
          <AuthForm onLoginSuccess={handleLogin} />
        ) : (
          <BugDashboard user={currentUser} onLogout={handleLogout} />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
