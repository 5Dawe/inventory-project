# Easy Inventory Application
## Getting Started
- This project has a single branch: "Main". You can clone this to run the project in Development.
- You can use Node Package Manager to install the dependencies: "npm install".
- Both the Development and Production databases are hosted in MongoDB Atlas. You can point to your own database by creating a *.env* file and adding your MONGODB_PRODUCTION_URI and MONGODB_URI to this file.
- You run run this application in development using "npm run dev"
- You may have to bypass the username middleware in order to setup your first user in a blank database. Simply comment out line 59 in index.js "return res.redirect('/');" relaunch the application and then go direct to the create user URL: http://localhost:20001/create-user which will allow you to create a user for testing.