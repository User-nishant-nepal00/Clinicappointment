import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Paper,
} from '@mui/material';
import {
  LocalHospital,
  Schedule,
  Person,
  Security,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';

const Services = () => {
  const services = [
    {
      icon: <LocalHospital sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'General Consultation',
      description: 'Comprehensive health check-ups and consultations with our experienced doctors.',
      price: 'Free'
    },
    {
      icon: <Schedule sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Appointment Booking',
      description: 'Easy online appointment scheduling system for your convenience.',
      price: 'Free'
    },
    {
      icon: <Person sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Specialized Care',
      description: 'Access to specialists in various medical fields.',
      price: 'Varies'
    },
    {
      icon: <Security sx={{ fontSize: 60, color: 'primary.main' }} />,
      title: 'Health Records',
      description: 'Secure digital health records management system.',
      price: 'Free'
    }
  ];

  const contactInfo = [
    {
      icon: <Phone sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: 'Phone',
      value: '+1 (555) 123-4567'
    },
    {
      icon: <Email sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: 'Email',
      value: 'info@clinic.com'
    },
    {
      icon: <LocationOn sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: 'Address',
      value: '123 Medical Center Dr, Healthcare City, HC 12345'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 6 }}>
        {/* Header */}
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 6,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            height: '40vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                Our Services
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Comprehensive healthcare services designed for your well-being
              </Typography>
            </Box>
          </Container>
        </Paper>

        {/* Services Section */}
        <Typography
          component="h2"
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          What We Offer
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  p: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <Typography gutterBottom variant="h6" component="h3">
                    {service.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {service.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
                    {service.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Features Section */}
        <Box sx={{ bgcolor: 'grey.100', py: 6, borderRadius: 2, mb: 6 }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              gutterBottom
              sx={{ mb: 4 }}
            >
              Why Choose Our Clinic?
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <LocalHospital sx={{ fontSize: 40, color: 'primary.main', mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Expert Medical Staff
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Our team consists of highly qualified and experienced healthcare professionals dedicated to providing the best care possible.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Schedule sx={{ fontSize: 40, color: 'primary.main', mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Convenient Scheduling
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Book appointments online at your convenience, 24/7. No more waiting on hold or visiting the clinic just to schedule.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Security sx={{ fontSize: 40, color: 'primary.main', mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Secure & Private
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your health information is protected with the highest security standards. We prioritize your privacy and confidentiality.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Person sx={{ fontSize: 40, color: 'primary.main', mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Patient-Centered Care
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We focus on your individual needs and provide personalized care plans to ensure the best health outcomes.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Contact Information */}
        <Typography
          component="h2"
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 4 }}
        >
          Contact Us
        </Typography>
        
        <Grid container spacing={4}>
          {contactInfo.map((contact, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ mb: 2 }}>{contact.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {contact.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {contact.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Services;
