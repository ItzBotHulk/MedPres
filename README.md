MedPres (Medical Perception) - Front-End

    MedPres (Medical Perception) is a front-end demonstration project for a modern medical application. It showcases a complete, responsive user interface built purely with HTML, CSS, and plain JavaScript, without any backend.

All user data, including login and registration details, is simulated and stored in the browser's localStorage.

Features

100% Front-End: Built entirely with HTML, CSS, and JavaScript.

No Backend Required: All data is stored locally in the browser's localStorage.

Simulated User Authentication: A complete (mocked) flow for user registration and login.

Single Admin Role: A special, unique administrator account is assigned to the first user who registers as admin.

Static Pages: Includes "Home," "About," and "Contact" pages.

Responsive Design: A clean, app-like interface that works on desktop and mobile.

🚀 How to Run

This is a pure front-end project. No backend or database setup is needed.

Clone the repository (or download the files):

git clone [https://github.com/your-username/medpres.git](https://github.com/your-username/medpres.git)


Open the index.html file:
Navigate to the project folder and double-click index.html to open it directly in your browser.

🔑 Admin Access & Login

This application uses localStorage to simulate user accounts. This means all user data is stored only in your local browser.

How to Create the Admin Account

The system's JavaScript is designed to assign admin privileges to the first user who registers with the username admin.

Open the application. Important: If you have already tested the app, you may need to clear your browser's local storage for this site first.

(Press F12 to open Dev Tools -> Application tab -> Local Storage -> Right-click your site -> Clear)

Navigate to the Registration Page.

Fill out the registration form with:

Username: admin

Password: (Choose any password you want for the admin)

Complete the registration.

This account is now the sole administrator for your browser. The application's JavaScript will now prevent any other user from registering with the username admin (as it's now "taken" in your localStorage).

How to Log in as Admin

Navigate to the Login Page.

Enter the credentials you just created:

Username: admin

Password: (The password you chose during registration)

🧑‍⚕️ Normal User Usage

Register: Any user can register with a username other than "admin" (e.g., "dr_smith"). This will create a normal user account in localStorage.

Login: Log in with their new credentials.

Logout: Click the "Logout" button to clear the session.
