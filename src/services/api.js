import axios from 'axios';

// Configure axios base URL - Using proxy to avoid CORS
const API_BASE_URL = process.env.REACT_APP_API_URL || '/clinic-api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userType');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login.php', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register.php', userData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const loginDoctor = async (credentials) => {
  try {
    const response = await api.post('/auth/doctor-login.php', credentials);
    if (response.token) {
      localStorage.setItem('token', response.token);
    }
    return response;
  } catch (error) {
    throw error;
  }
};

// Appointments API calls
export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments/create.php', appointmentData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAppointments = async (userId, userType) => {
  try {
    const response = await api.get(`/appointments/list.php?user_id=${userId}&user_type=${userType}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateAppointment = async (appointmentId, updateData) => {
  try {
    const response = await api.put(`/appointments/update.php?id=${appointmentId}`, updateData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await api.delete(`/appointments/delete.php?id=${appointmentId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Doctors API calls
export const getDoctors = async () => {
  try {
    const response = await api.get('/doctors/list.php');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDoctor = async (doctorId) => {
  try {
    const response = await api.get(`/doctors/get.php?id=${doctorId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

// Admin API calls
export const getAdminStats = async () => {
  try {
    const response = await api.get('/admin/stats.php');
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/admin/users.php');
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const response = await api.put(`/admin/user-status.php?id=${userId}`, { status });
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;
