# Setup Guide for Clinic Management System

## Prerequisites

1. **Node.js** (v14 or higher) - Download from [nodejs.org](https://nodejs.org/)
2. **XAMPP** (or similar local web server) - Download from [apachefriends.org](https://www.apachefriends.org/)
3. **MySQL** (comes with XAMPP)

## Step 1: Start XAMPP

1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services
3. Make sure both services show green status

## Step 2: Set Up Database

1. Open your web browser and go to: `http://localhost/phpmyadmin`
2. Create a new database called `db_file`
3. Import the database schema:
   - Click on the `db_file` database
   - Go to "Import" tab
   - Choose file: `Clinicsystem/Summerproject/db_file.sql`
   - Click "Go" to import

## Step 3: Configure Database Connection

1. Open `clinic-api/config/database.php`
2. Update the credentials if needed:
   ```php
   private $username = "root";      // Your MySQL username
   private $password = "";          // Your MySQL password
   ```

## Step 4: Start React Frontend

1. Open terminal/command prompt
2. Navigate to the project directory: `cd Practice-main`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

The React app will open at: `http://localhost:3000`

## Step 5: Test the System

### Test Accounts

**Patient Login:**
- Email: `test@example.com` (register first)
- Password: `password123`

**Doctor Login:**
- Email: `ramsharma@gmail.com`
- Password: `12345678`

## Troubleshooting

### Common Issues:

1. **Database Connection Error:**
   - Check if MySQL is running in XAMPP
   - Verify database credentials in `database.php`
   - Make sure `db_file` database exists

2. **React App Won't Start:**
   - Check if Node.js is installed: `node --version`
   - Try deleting `node_modules` folder and run `npm install` again

3. **API Endpoints Not Working:**
   - Ensure Apache is running in XAMPP
   - Check if `clinic-api` folder is in XAMPP's `htdocs` directory
   - Verify `.htaccess` file exists in `clinic-api` folder

4. **CORS Issues:**
   - Check browser console for CORS errors
   - Ensure `.htaccess` file is properly configured
   - Verify API base URL in React app matches your setup

## File Structure

```
Practice-main/
├── src/                    # React frontend source code
├── public/                 # React public files
├── clinic-api/            # PHP backend API
│   ├── config/            # Database configuration
│   ├── auth/              # Authentication endpoints
│   ├── appointments/      # Appointment management
│   ├── doctors/           # Doctor management
│   └── admin/             # Admin functions
├── package.json           # React dependencies
└── README.md             # Project documentation
```

## API Endpoints

- **Base URL:** `http://localhost/clinic-api`
- **Patient Login:** `POST /auth/login.php`
- **Patient Register:** `POST /auth/register.php`
- **Doctor Login:** `POST /auth/doctor-login.php`
- **Create Appointment:** `POST /appointments/create.php`
- **List Appointments:** `GET /appointments/list.php`
- **List Doctors:** `GET /doctors/list.php`

## Next Steps

1. Test all functionality
2. Customize the UI as needed
3. Add more features
4. Deploy to production server

## Support

If you encounter issues:
1. Check the browser console for errors
2. Check XAMPP error logs
3. Verify all prerequisites are installed
4. Ensure file permissions are correct
