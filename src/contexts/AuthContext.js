import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'patient', 'doctor', 'admin'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user');
    const type = localStorage.getItem('userType');
    const token = localStorage.getItem('token');
    
    if (user && type && token) {
      try {
        setCurrentUser(JSON.parse(user));
        setUserType(type);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('user');
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
      }
    } else {
      // Clear any partial data
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      localStorage.removeItem('token');
    }
    
    setLoading(false);
  }, []);

  const login = (user, type) => {
    console.log('Login called with:', { user, type });
    setCurrentUser(user);
    setUserType(type);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('userType', type);
    console.log('Login state updated:', { currentUser: user, userType: type });
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
  };

  const value = {
    currentUser,
    userType,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
