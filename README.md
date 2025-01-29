Here is your updated README.md with added information about the Admin Page, City API, and Currency API while keeping the original format.

README.md

# CODS User Management System

## 📌 Project Description
This project is a user management system with authentication, administration, and user role management features. It allows users to register, log in, and manage their profiles, while administrators can manage all users, including adding, editing, and deleting accounts.

Additionally, the system includes APIs to fetch **city information** and **currency exchange rates**.

---

## 🚀 Features
- **User Authentication**
  - Register and log in securely
  - Session-based authentication
- **Admin Panel**
  - View all users
  - Add new users
  - Edit user details
  - Delete users
- **User Profile Management**
- **Secure Password Hashing (bcrypt.js)**
- **MongoDB Atlas Integration**
- **City and Weather API**
  - Retrieve city information and weather updates
- **Currency Exchange API**
  - Convert between different currencies using real-time exchange rates

---

## 🛠️ Installation Guide


2. Install Dependencies

npm install

3. Create a .env File

Inside the root directory, create a .env file and add the following:

MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.mongodb.net/user_cods?retryWrites=true&w=majority
SESSION_SECRET=your_secret_key
PORT=3000
CITY_API_KEY=your_city_api_key
CURRENCY_API_KEY=your_currency_api_key

	•	Replace yourusername and yourpassword with your actual MongoDB credentials.
	•	Set SESSION_SECRET to a strong random value.
	•	Add your City API key and Currency API key.

4. Start the Server

node server.js

The server will run on http://localhost:3000

📌 User Roles

1. Regular Users
	•	Register and log in.
	•	Access the profile page.

2. Administrators
	•	Access the /admin panel.
	•	View all users.
	•	Edit or delete users.
	•	Create new users with admin rights.

📌 API Endpoints

Authentication

Method	Route	Description
GET	/login	Renders the login page
POST	/login	Logs in a user
GET	/register	Renders the registration page
POST	/register	Registers a new user
POST	/logout	Logs out the user

User Management

Method	Route	Description
GET	/profile	Displays the user’s profile
GET	/front	Main dashboard page
GET	/catalog	Product catalog page
GET	/basket	Shopping basket page
GET	/edit_profile	Profile editing page

Admin Panel


City API

Method	Route	Description
GET	/api/city/:name	Fetches city information (weather, population, location)

Currency API

Method	Route	Description
GET	/api/currency/:from/:to	Converts currency from one to another

📌 How to Use the Admin Page?

1. Logging in as Admin
	•	Open /login and enter the admin credentials. (email: admin@cods.htnl ; password: 1234567)
	•	After logging in, you will be redirected to /admin.

2. Managing Users
	•	View Users: See all registered users.
	•	Add User: Enter a new username, email, and password.
	•	Edit User: Modify user details, including admin status.
	•	Delete User: Remove a user from the database.

3. Admin Form Structure
	•	Admins can create, edit, and delete users from the admin panel.
	•	Example User Form:

<form action="/admin/add" method="POST">
    <label>Username:</label>
    <input type="text" name="username" required>
    
    <label>Email:</label>
    <input type="email" name="email" required>

    <label>Password:</label>
    <input type="password" name="password" required>
    
    <label>Admin:</label>
    <input type="checkbox" name="admin">
    
    <button type="submit">Add User</button>
</form>

📌 How to Add an Admin User?

Method 1: Create via MongoDB
	1.	Open MongoDB Atlas or Compass.
	2.	Find the users collection.
	3.	Insert a new document:

{
    "username": "admin",
    "email": "admin@cods.com",
    "password": "<hashed_password>",
    "admin": true,
    "createdAt": { "$date": "2025-01-27T03:40:34.412Z" }
}

	4.	Replace <hashed_password> with a bcrypt hash.

Method 2: Use an Express Route

Add this temporary route to server.js:

app.get('/create-admin', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash('your_password', 10);
        const newAdmin = new User({
            username: 'admin',
            email: 'admin@cods.com',
            password: hashedPassword,
            admin: true,
        });
        await newAdmin.save();
        res.send('Admin created successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating admin');
    }
});\

 Troubleshooting

1. Cannot Access /admin
	•	Ensure your user has admin: true in the database.
	•	Check if req.session.isAdmin is being set properly after login.

2. MongoDB Connection Issues
	•	Verify your MONGO_URI in .env.
	•	Check your MongoDB Atlas IP Whitelist.

3. Session Not Persisting
	•	Ensure cookies are enabled in your browser.
	•	Check your session configuration in server.js.

4. City API Not Working
	•	Ensure you have set CITY_API_KEY in your .env file.
	•	Test using: GET /api/city/London

5. Currency API Not Working
	•	Ensure you have set CURRENCY_API_KEY in your .env file.

👥 Contributors
	•	Ussurbayeva Inkar
  •	Ablanova Dariya
  •	Alpieva Leila


---

### **What’s New in This Version?**
✔ Added **Admin Page details**  
✔ Included **City API and Currency API details**  
