# MILOS-DESPOTOVIC-IS24-full-stack-competition-req97073

## Installing and Running the App

**Run all commands from the root folder of the repository**

### Method 1. Using npm

**recommended method**

The quickest and simplest way to install and run this project. Clone the repository, navigate to the root folder in your terminal, and run the commands:

1. 'npm install'
2. 'npm start' (once installation from step 1 is complete)
3. Navigate to 'http://localhost:3000' in a browser to view the app

#### Note: To make this installation process simpler, the build folder of the React application is already included in the GitHub repo.

&nbsp;

### Method 2. Pulling and running DockerHub docker image

If you have the docker CLI installed, you can pull the built image from DockerHub and run it with the following commands:

1. 'docker pull milosdes/imbapp:latest'
2. 'docker run -p 3000:3000 milosdes/imbapp:latest'
3. Navigate to 'http://localhost:3000' in a broswer to access the app

#### Note: When running from a docker container, the file saving function of the app won't work. Whenever the docker container is restarted, the data will be reset.

&nbsp;

### Method 3. Building the docker image locally and running it

Clone the repository, navigate to the root folder, and run the commands:

1. 'docker build . -t imbapp'
2. 'docker run -p 3000:3000 imbapp'

&nbsp;

### Method 4. With frontend development server

Run the backend api (port 3000) and the frontend client on it's own development server (port 3001) with the following:

1. 'npm install'
2. 'npm run install-client'
3. 'npm run start-dev'
4. The app should automatically open in the browser. If it doesn't, navigate to 'http://localhost:3000' in a browser to view the app.

&nbsp;

### Method 5. Creating a new frontend build

Run the following commands to create a new build and serve it:

1. 'npm install'
2. 'npm run install-client'
3. 'npm run build-client'
4. 'npm run start'
5. Navigate to 'http://localhost:3000' in a browser to view the app

&nbsp;

## Exiting the App

Use 'ctrl + C' in the terminal to stop the app from running.

## Documentation

Swagger is used to provide documentation for the api component of this app. After installing and running the application, navigate to 'http://localhost:3000/api/api-docs' to view the docs.

## Tech Stack Choice - Explanation

An express backend and plain React app were chosen for this project because they are more explicit with things like routing, and so for the purpose of this project can better demonstrate understanding of such topics. Another effective option for this project would have been to use a framework like Nextjs.

## Additional Notes

-   The product list table requires a minimum screen size of 960px to be displayed in its entirety.
-   For the developers input, you must click the "+" button or focus away from the input field for the name currently in the input field to be added to the list of developers.
-   Adding developers is limited to a maximum of 5. If 5 developers are already present, you will need to remove a developer before adding a new one.
-   The date field requires a year between 1900 and the current year, and the month and day as either single or double digit inputs (eg. 1 or 01). It will autoformat to save in the "YYYY/MM/DD" format if using single digits.
