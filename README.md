# Installing and Running the App

**Run all commands from the root folder of the repository**

To install and run this project, clone the repository, navigate to the root folder in your terminal, and run the commands:

1. 'npm install'
2. 'npm start' (once installation from step 1 is complete)
3. Navigate to 'http://localhost:3000' in a browser to view the app

#### Note: For simplicity, the build folder of the React application is included in the GitHub repo.

Two alternatives to installing and running the app:

### Alternative one

Run the backend api (port 3000) and the frontend client on it's own development server (port 3001) with the following:

1. 'npm install'
2. 'npm run install-client'
3. 'npm run start-dev'
4. The app should automatically open in the browser. If it doesn't, navigate to 'http://localhost:3000' in a browser to view the app.

### Alternative two

Run the following commands to create a new build and serve it:

1. 'npm install'
2. 'npm run install-client'
3. 'npm run build-client'
4. 'npm run start'
5. Navigate to 'http://localhost:3000' in a browser to view the app

### Exiting the App

Use 'ctrl + C' in the terminal to stop the app from running.

## Tech Stack Choice - Explanation

An express backend and plain React app were chosen for this project because they are more explicit with things like routing, and so for the purpose of this project can better demonstrate understanding of such topics. Another option for this project would have been a framework like Nextjs as well.
