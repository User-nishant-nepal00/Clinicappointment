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
  Avatar,
} from '@mui/material';
import {
  LocalHospital,
  EmojiEvents,
  People,
  Security,
} from '@mui/icons-material';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Ram Sharma',
      position: 'Chief Medical Officer',
      specialty: 'Internal Medicine',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Leading our medical team with over 15 years of experience in internal medicine.'
    },
    {
      name: 'Dr. Hari Yadav',
      position: 'Senior Physician',
      specialty: 'Cardiology',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f7a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Specialized in cardiovascular health with a focus on preventive care.'
    },
    {
      name: 'Dr. Shyam Verma',
      position: 'General Practitioner',
      specialty: 'Family Medicine',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      description: 'Providing comprehensive care for patients of all ages and backgrounds.'
    }
  ];

  const stats = [
    {
      icon: <LocalHospital sx={{ fontSize: 40, color: 'primary.main' }} />,
      number: '5000+',
      label: 'Patients Served'
    },
    {
      icon: <People sx={{ fontSize: 40, color: 'primary.main' }} />,
      number: '15+',
      label: 'Years Experience'
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40, color: 'primary.main' }} />,
      number: '100%',
      label: 'Patient Satisfaction'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: 'primary.main' }} />,
      number: '24/7',
      label: 'Online Support'
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
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
            height: '50vh',
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
                About Our Clinic
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Dedicated to providing exceptional healthcare services with compassion and excellence
              </Typography>
            </Box>
          </Container>
        </Paper>

        {/* Mission & Vision */}
        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom color="primary">
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              To provide accessible, high-quality healthcare services that improve the health and well-being of our community. 
              We strive to deliver compassionate care in a comfortable and welcoming environment.
            </Typography>
            <Typography variant="body1" paragraph>
              Our commitment extends beyond treating illness to promoting wellness and preventive care, 
              ensuring that every patient receives personalized attention and comprehensive medical support.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom color="primary">
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph>
              To be the leading healthcare provider in our region, recognized for excellence in patient care, 
              innovative medical practices, and community health improvement.
            </Typography>
            <Typography variant="body1" paragraph>
              We envision a future where quality healthcare is accessible to all, supported by cutting-edge 
              technology and a team of dedicated healthcare professionals committed to making a difference.
            </Typography>
          </Grid>
        </Grid>

        {/* Statistics */}
        <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 6, borderRadius: 2, mb: 8 }}>
          <Container maxWidth="lg">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Our Impact
            </Typography>
            
            <Grid container spacing={4}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>{stat.icon}</Box>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="h6">
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Team Section */}
        <Typography
          component="h2"
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Meet Our Team
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={member.image}
                  alt={member.name}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="h3">
                    {member.name}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {member.position}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Specialty:</strong> {member.specialty}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Values Section */}
        <Box sx={{ bgcolor: 'grey.100', py: 6, borderRadius: 2 }}>
          <Container maxWidth="md">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              gutterBottom
              sx={{ mb: 4 }}
            >
              Our Values
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <LocalHospital sx={{ fontSize: 40, color: 'primary.main', mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Excellence
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We maintain the highest standards of medical care and continuously strive for improvement in all aspects of our service.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <People sx={{ fontSize: 40, color: 'primary.main', mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Compassion
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We treat every patient with kindness, empathy, and respect, understanding that healthcare is deeply personal.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <Security sx={{ fontSize: 40, color: 'primary.main', mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Integrity
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We conduct ourselves with honesty, transparency, and ethical behavior in all our interactions.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                  <EmojiEvents sx={{ fontSize: 40, color: 'primary.main', mr: 2, mt: 0.5 }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Innovation
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      We embrace new technologies and approaches to provide the best possible care for our patients.
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </Container>
  );
};

export default About;
