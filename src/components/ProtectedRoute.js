import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

const ProtectedRoute = ({ children, requiredUserType = null }) => {
  const { currentUser, userType, loading } = useAuth();

  // Debug logging
  console.log('ProtectedRoute Debug:', {
    currentUser,
    userType,
    loading,
    requiredUserType,
    hasAccess: currentUser && (!requiredUserType || userType === requiredUserType)
  });

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (!currentUser) {
    console.log('No current user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  if (requiredUserType && userType !== requiredUserType) {
    console.log(`User type mismatch. Required: ${requiredUserType}, Actual: ${userType}`);
    // Redirect to appropriate login based on user type
    if (userType === 'doctor') {
      return <Navigate to="/doctor-dashboard" replace />;
    } else if (userType === 'patient') {
      return <Navigate to="/appointment" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  console.log('Access granted to protected route');
  return children;
};

export default ProtectedRoute;
