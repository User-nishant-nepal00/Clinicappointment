import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
// Removed MUI date pickers to avoid compatibility issues
import { getDoctors, createAppointment, getAppointments } from '../services/api';

const Appointment = () => {
  const { currentUser, userType } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    doctor: '',
    scheduleDate: '',
    scheduleTime: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    fetchDoctors();
    fetchAppointments();
  }, [currentUser, navigate]);

  const fetchDoctors = async () => {
    try {
      const response = await getDoctors();
      if (response.success) {
        setDoctors(response.doctors || []);
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await getAppointments(currentUser.id, userType);
      if (response.success) {
        setAppointments(response.appointments || []);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Date and time are now handled by the general handleChange function

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }
    
    if (!formData.doctor) {
      newErrors.doctor = 'Please select a doctor';
    }
    
    if (!formData.scheduleDate) {
      newErrors.scheduleDate = 'Please select a date';
    }
    
    if (!formData.scheduleTime) {
      newErrors.scheduleTime = 'Please select a time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const appointmentData = {
        patientName: formData.patientName,
        age: parseInt(formData.age),
        doctor: formData.doctor,
        scheduleDate: formData.scheduleDate.toISOString().split('T')[0],
        scheduleTime: formData.scheduleTime.toTimeString().split(' ')[0],
      };

      const response = await createAppointment(appointmentData);
      if (response.success) {
        setSuccessMessage('Appointment booked successfully!');
        setFormData({
          patientName: '',
          age: '',
          doctor: '',
          scheduleDate: null,
          scheduleTime: null,
        });
        fetchAppointments(); // Refresh the list
      } else {
        setErrorMessage(response.message || 'Failed to book appointment');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error('Appointment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setShowAppointmentDialog(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    return timeString;
  };

  if (!currentUser) {
    return null;
  }

  return (
    <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Book Appointment
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {/* Appointment Form */}
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              New Appointment
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Patient Name"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    error={!!errors.patientName}
                    helperText={errors.patientName}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    error={!!errors.age}
                    helperText={errors.age}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.doctor}>
                    <InputLabel>Select Doctor</InputLabel>
                    <Select
                      name="doctor"
                      value={formData.doctor}
                      label="Select Doctor"
                      onChange={handleChange}
                    >
                      {doctors.map((doctor) => (
                        <MenuItem key={doctor.doctor_id} value={doctor.doctor_firstname + ' ' + doctor.doctor_lastname}>
                          Dr. {doctor.doctor_firstname} {doctor.doctor_lastname}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.doctor && (
                      <Typography variant="caption" color="error">
                        {errors.doctor}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Appointment Date"
                    name="scheduleDate"
                    type="date"
                    value={formData.scheduleDate || ''}
                    onChange={handleChange}
                    error={!!errors.scheduleDate}
                    helperText={errors.scheduleDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: new Date().toISOString().split('T')[0]
                    }}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Appointment Time"
                    name="scheduleTime"
                    type="time"
                    value={formData.scheduleTime || ''}
                    onChange={handleChange}
                    error={!!errors.scheduleTime}
                    helperText={errors.scheduleTime}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                >
                  {loading ? 'Booking...' : 'Book Appointment'}
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Appointments List */}
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Your Appointments
            </Typography>
            
            {appointments.length === 0 ? (
              <Typography variant="body1" color="text.secondary" align="center">
                No appointments found
              </Typography>
            ) : (
              <Grid container spacing={2}>
                {appointments.map((appointment) => (
                  <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {appointment.patient_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Age: {appointment.age}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Doctor: {appointment.doctor}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Date: {formatDate(appointment.schedule_date)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Time: {formatTime(appointment.schedule_time)}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          onClick={() => handleViewAppointment(appointment)}
                        >
                          View Details
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Box>

        {/* Appointment Detail Dialog */}
        <Dialog
          open={showAppointmentDialog}
          onClose={() => setShowAppointmentDialog(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogContent>
            {selectedAppointment && (
              <Box>
                <Typography variant="body1" gutterBottom>
                  <strong>Patient:</strong> {selectedAppointment.patient_name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Age:</strong> {selectedAppointment.age}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Doctor:</strong> {selectedAppointment.doctor}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Date:</strong> {formatDate(selectedAppointment.schedule_date)}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>Time:</strong> {formatTime(selectedAppointment.schedule_time)}
                </Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAppointmentDialog(false)}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
              </Container>
      );
};

export default Appointment;
