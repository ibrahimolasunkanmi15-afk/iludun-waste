Iludun Osogbo Waste Pickup Scheduling App
A mobile-friendly React application built, managed, and deployed directly from Android using Termux. This app streamlines waste management for residents of the Iludun community in Osogbo, Osun State, by providing automated local scheduling, reminders, feedback collection, and a secure administration panel. 
🚀 Live Demo
The application is live and accessible at: [https://iludun-waste-app.netlify.app]
 ✨ Features
👤 User Portal
Booking Form: Input name, phone number, specific Iludun street address, waste category, and date.
Service Feedback: Submit comments or complaints directly to community administrators.
Reminders: Visual booking receipts and local storage tokens to track upcoming schedules.
 🔐 Admin Portal
Secure Access: Protected by a customizable admin password (Default password: iludun2026).
Activity Tracker:  Real-time summary overview of pending and completed pickups.
Feedback Monitor: Review operational reports sent by community residents.
Security Control: On-the-fly password updating directly saved to local configurations.
🛠️ Tech Stack & Environment
Environment: Termux (Android Terminal Emulator)
Runtime: Node.js (v18+)
Framework: React + Vite
Styling: Vanilla CSS3 (Mobile-first responsive architecture)
Data Persistence: Web LocalStorage API
Deployment Platform: Netlify
 💻 Local Development via Termux
If you want to clone this repository and spin up the development server again inside Termux, follow these commands: 
1. Prerequisite Installations
Ensure your packages are completely up to date and you have Node.js installed inside your terminal: 
pkg update && pkg upgrade
pkg install nodejs git
 2. Project Setup
Clone this repository or navigate to the directory: 
git clone <your-repo-link>
cd waste-scheduler
npm install
3. Run the Development Server
npm run dev
Open the generated http://localhost:5173 link in your Android browser to view the 
application locally. 
📦 Deployment Instructions
To push updates live using the static build files: 
Go to: https:/app.netlify.com 
 Sign in if you have an account already or register and create an account 
Login or verify your account and login (if just registered)
Click on upload file, to select your software codes (make sure they are 
compressed or in zip format for easy upload)
Wait and let Netlify  makes the application go  live.
Manual Push: Commit updates via Git to GitHub, which automatically triggers a 
rebuilding cycle on Netlify if continuous deployment is linked.
🔒 Security Notice
The code to set admin password is ### 🔒 Security & Local Configuration
1. Create a `.env` file in the root directory of the project.
2. Copy and paste the following keys into the file:
   ```env
   VITE_ADMIN_PASSWORD=your_secure_password_here
   ```
3. Replace `your_secure_password_here` with your custom administrator password.
 For security purposes. Login to the 
admin panel immediately upon first load and navigate to the password settings module 
to change this value.
