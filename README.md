# Clinic Management System

A modern clinic management system built with React frontend and PHP backend API.

## Features

- **Patient Management**: Registration, login, and appointment booking
- **Doctor Portal**: Login and appointment management
- **Admin Dashboard**: User management and system statistics
- **Modern UI**: Built with Material-UI components
- **Responsive Design**: Works on all devices
- **Secure Authentication**: JWT-based authentication system

## Project Structure

```
Practice-main/
├── src/                    # React frontend source code
│   ├── components/        # Reusable UI components
│   ├── contexts/          # React context providers
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   ├── App.js            # Main app component
│   └── index.js          # React entry point
├── clinic-api/            # PHP backend API
│   ├── auth/             # Authentication endpoints
│   ├── appointments/      # Appointment management
│   ├── doctors/          # Doctor-related endpoints
│   ├── admin/            # Admin functions
│   ├── config/           # Database configuration
│   └── utils/            # Utility functions
├── public/                # Static assets
└── package.json          # Node.js dependencies
```

## Prerequisites

- Node.js (v14 or higher)
- PHP (v7.4 or higher)
- MySQL/MariaDB
- Web server (Apache/Nginx)

## Installation

### 1. Frontend Setup

```bash
# Navigate to project directory
cd Practice-main

# Install dependencies
npm install

# Start development server
npm start
```

The React app will run on `http://localhost:3000`

### 2. Backend Setup

1. **Configure Database**
   - Create a MySQL database named `db_file`
   - Import the database schema from `db_file.sql`
   - Update database credentials in `clinic-api/config/database.php`

2. **Configure Web Server**
   - Place the `clinic-api` folder in your web server's document root
   - Ensure PHP has access to the database
   - Set up proper CORS headers if needed

3. **Database Configuration**
   ```php
   // Update clinic-api/config/database.php
   private $host = "localhost";
   private $db_name = "db_file";
   private $username = "your_username";
   private $password = "your_password";
   ```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost/clinic-api
```

## Usage

### Patient Features

1. **Registration**: Create a new patient account
2. **Login**: Access patient portal
3. **Book Appointments**: Schedule appointments with doctors
4. **View Appointments**: See all booked appointments

### Doctor Features

1. **Login**: Access doctor portal
2. **View Appointments**: See patient appointments
3. **Manage Schedule**: View upcoming and past appointments

### Admin Features

1. **Dashboard**: View system statistics
2. **User Management**: Manage patients and doctors
3. **System Overview**: Monitor clinic operations

## API Endpoints

### Authentication
- `POST /auth/login.php` - Patient login
- `POST /auth/register.php` - Patient registration
- `POST /auth/doctor-login.php` - Doctor login

### Appointments
- `POST /appointments/create.php` - Create appointment
- `GET /appointments/list.php` - List appointments

### Doctors
- `GET /doctors/list.php` - List all doctors

### Admin
- `GET /admin/stats.php` - System statistics
- `GET /admin/users.php` - List all users

## Database Schema

The system uses three main tables:

1. **Registration**: Patient information
2. **doctors**: Doctor information
3. **appointments**: Appointment details

## Security Features

- JWT-based authentication
- Password hashing (recommended for production)
- CORS protection
- SQL injection prevention with prepared statements

## Production Deployment

### Frontend
```bash
npm run build
```
Deploy the `build` folder to your web server.

### Backend
- Ensure proper SSL certificates
- Use environment variables for sensitive data
- Implement proper password hashing
- Set up proper CORS policies
- Use a production-grade database

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your PHP backend has proper CORS headers
2. **Database Connection**: Verify database credentials and connection
3. **JWT Issues**: Check JWT secret key configuration
4. **File Permissions**: Ensure web server has read access to PHP files

### Debug Mode

Enable debug mode in PHP by setting:
```php
error_reporting(E_ALL);
ini_set('display_errors', 1);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support and questions, please open an issue in the repository.

## Changelog

### Version 1.0.0
- Initial release
- Patient registration and login
- Doctor portal
- Appointment booking system
- Admin dashboard
- Modern React UI with Material-UI
- PHP REST API backend
