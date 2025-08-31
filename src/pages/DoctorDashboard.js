import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  LocalHospital,
  Schedule,
  Person,
  Event,
  AccessTime,
} from '@mui/icons-material';
import { getAppointments } from '../services/api';

const DoctorDashboard = () => {
  const { currentUser, userType } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);

  useEffect(() => {
    if (!currentUser || userType !== 'doctor') {
      navigate('/doctor-login');
      return;
    }

    fetchAppointments();
  }, [currentUser, userType, navigate]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getAppointments(currentUser.id, userType);
      if (response.success) {
        setAppointments(response.appointments || []);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
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

  const getStatusColor = (date) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return 'default'; // Past appointment
    } else if (appointmentDate.getTime() === today.getTime()) {
      return 'warning'; // Today's appointment
    } else {
      return 'success'; // Future appointment
    }
  };

  const getStatusText = (date) => {
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (appointmentDate < today) {
      return 'Completed';
    } else if (appointmentDate.getTime() === today.getTime()) {
      return 'Today';
    } else {
      return 'Upcoming';
    }
  };

  if (!currentUser || userType !== 'doctor') {
    return null;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        {/* Header */}
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'primary.main',
            color: '#fff',
            mb: 4,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LocalHospital sx={{ fontSize: 40, mr: 2 }} />
            <Box>
              <Typography variant="h4" gutterBottom>
                Doctor Dashboard
              </Typography>
              <Typography variant="h6">
                Welcome back, Dr. {currentUser.firstName} {currentUser.lastName}
              </Typography>
            </Box>
          </Box>
        </Paper>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Schedule sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="h4" gutterBottom>
                  {appointments.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Appointments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Event sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                <Typography variant="h4" gutterBottom>
                  {appointments.filter(apt => {
                    const aptDate = new Date(apt.schedule_date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return aptDate.getTime() === today.getTime();
                  }).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Today's Appointments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <Person sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
                <Typography variant="h4" gutterBottom>
                  {appointments.filter(apt => {
                    const aptDate = new Date(apt.schedule_date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return aptDate > today;
                  }).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upcoming Appointments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center' }}>
                <LocalHospital sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                <Typography variant="h4" gutterBottom>
                  {appointments.filter(apt => {
                    const aptDate = new Date(apt.schedule_date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return aptDate < today;
                  }).length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Completed Appointments
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Appointments List */}
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Appointments
          </Typography>
          
          {loading ? (
            <Typography variant="body1" align="center">
              Loading appointments...
            </Typography>
          ) : appointments.length === 0 ? (
            <Typography variant="body1" color="text.secondary" align="center">
              No appointments found
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {appointments.map((appointment) => (
                <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6" gutterBottom>
                          {appointment.patient_name}
                        </Typography>
                        <Chip
                          label={getStatusText(appointment.schedule_date)}
                          color={getStatusColor(appointment.schedule_date)}
                          size="small"
                        />
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Age:</strong> {appointment.age}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Date:</strong> {formatDate(appointment.schedule_date)}
                      </Typography>
                      
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        <strong>Time:</strong> {formatTime(appointment.schedule_time)}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        variant="outlined"
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
              <Typography variant="h6" gutterBottom>
                Patient Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Name:</strong> {selectedAppointment.patient_name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Age:</strong> {selectedAppointment.age}
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Appointment Details
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Date:</strong> {formatDate(selectedAppointment.schedule_date)}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Time:</strong> {formatTime(selectedAppointment.schedule_time)}
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Status
              </Typography>
              <Chip
                label={getStatusText(selectedAppointment.schedule_date)}
                color={getStatusColor(selectedAppointment.schedule_date)}
                sx={{ mb: 2 }}
              />
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

export default DoctorDashboard;
