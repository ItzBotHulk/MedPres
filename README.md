<h1>MedPres (Medical Perception) - Front-End</h1>

<<<<<<< HEAD
    MedPres (Medical Perception) is a front-end demonstration project for a modern medical application. It showcases a complete, responsive user interface built purely with HTML, CSS, and plain JavaScript, without any backend.
=======
  <p><span style="color:white; background-color:gray;">MedPres (Medical Perception)</span> is a front-end project for a modern medical application. It showcases a complete, responsive user interface built purely with HTML, CSS, and plain JavaScript, without any backend.</p>
>>>>>>> 6cbf7dbf4de2c6f7a7686c0d82ad53c5f8834f98

<p>All user data, including login and registration details, is simulated and stored in the browser's <span style="background-color:gray;">localStorage</span>.</p>

<h2>Features</h2>

<ul>
  <li>100% Front-End: Built entirely with HTML, CSS, and JavaScript.</li>

<li>No Backend Required: All data is stored locally in the browser's localStorage.</li>

<li>Simulated User Authentication: A complete (mocked) flow for user registration and login.</li>

<li>Single Admin Role: A special, unique administrator account is assigned to the first user who registers as admin.</li>

<li>Static Pages: Includes "Home," "About," and "Contact" pages.</li>

<li>Responsive Design: A clean, app-like interface that works on desktop and mobile.</li>
</ul>
<h2>🚀 How to Run</h2>

<ol>
<p>This is a pure front-end project. No backend or database setup is needed.</p>

<li>Clone the repository (or download the files):</li>
<span style="color:white; background-color:gray; height:20vh; width:60vw;">
git clone [https://github.com/ItzBotHulk/MedPres]
</span>

<li>Open the <span style="color:white; background-color:gray;">index.html</span> file:
Navigate to the project folder and double-click <span style="color:white; background-color:gray;">index.html</span> to open it directly in your browser.</li>
</ol>

<h2>🔑 Admin Access & Login</h2>

This application uses <span style="color:white; background-color:gray;">localStorage</span> to simulate user accounts. This means all user data is stored only in your local browser.

<h3>How to Create the Admin Account</h3>

The system's JavaScript is designed to assign admin privileges to the first user who registers with the username <span style="color:white; background-color:gray;">admin</span>.

<ol>
<li>Open the application. Important: If you have already tested the app, you may need to clear your browser's local storage for this site first.

(Press <span style="color:white; background-color:gray;">F12</span> to open Dev Tools -> <span style="color:white; background-color:gray;">Application</span> tab -> <span style="color:white; background-color:gray;">Local Storage</span> -> Right-click your site -> <span style="color:white; background-color:gray;">Clear</span>)</li>

<li>Navigate to the <b>Registration Page</b>.</li>

<li>Fill out the registration form with:

<b>Username:</b> <span style="color:white; background-color:gray;">admin</span>

<b>Password:</b> (Choose any password you want for the admin)</li>

<li>Complete the registration.</li>

This account is now the sole administrator for your browser. The application's JavaScript will now prevent any other user from registering with the username admin (as it's now "taken" in your localStorage).
</ol>
<h2>How to Log in as Admin</h2>
<ol>
<li>Navigate to the Login Page.</li>

<li>Enter the credentials you just created:</li>
<ul>
<li>Username: <span style="color:white; background-color:gray;">admin</span></li>
<li>Password: (The password you chose during registration)</li>
</ul>
</ol>

<h2>🧑‍⚕️ Normal User Usage</h2>
<ul>
<li><b>Register:</b> Any user can register with a username other than "admin". This will create a normal user account in <span style="color:white; background-color:gray;">localStorage</span>.</li>

<li><b>Login:</b> Log in with their new credentials.</li>

<li><b>Logout:</b> Click the "Logout" button to clear the session.</li>
</ul>
