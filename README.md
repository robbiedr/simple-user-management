# Simple User Management

Simple User Management is a project that demonstrates basic user management functionality using Node.js and PostgreSQL. It allows you to register new users, activate account, authenticate them, change password, and retrieve user list and details.

## Prerequisites

Before running the Simple User Management project, make sure you have the following dependencies installed:
- Docker: Install Docker from [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- Node.js: Install Node.js from [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

## Getting Started

To run the Simple User Management project, you will need to have Docker installed on your system. Docker provides a containerization platform that simplifies the setup and deployment of the application's dependencies.

Follow the steps below to get started:

1. Clone the repository to your local machine:
   git clone https://github.com/robbiedr/simple-user-management.git

2. Navigate to the project directory:
   cd simple-user-management

3. Create a .env file in the root directory and provide the necessary environment variables. You can use the provided .env.example file as a template.

4. Update the database connection configuration in the `app.js` file based on your setup:
   - If you are running the application locally without using Docker, set the `DB_HOST` environment variable to `127.0.0.1`.
   - If you are running the application using Docker, set the `DB_HOST` environment variable to the service name defined in the `docker-compose.yml` file.

5. Build and start the Docker containers using docker-compose:
   docker-compose up

   This command will build the application and database containers and start them. You should see the application logs in the terminal.

6. Access the application:
   Once the containers are up and running, you can access the Simple User Management application by opening your web browser and navigating to [http://localhost:3000](http://localhost:3000).

   Replace `3000` with the actual port number specified in the environment variable `APP_PORT`.

7. Use the application:
   - TODO: Complete this part

8. MailDev:
   The application uses MailDev as a mock email server for sending emails. You can access the MailDev web interface by opening your web browser and navigating to http://localhost:1080. Emails sent by the application will be captured and displayed in the MailDev interface.

9. Stop the containers:
   To stop the application and the associated containers, press Ctrl+C in the terminal where you ran the docker-compose up command.

10. API Documentation:
   The Simple User Management API is documented using Swagger. You can access the API documentation by opening your web browser and navigating to http://localhost:${APP_PORT}/api-docs. The API documentation provides detailed information about the available endpoints, request bodies, responses, and more.


>**Note:** It is highly recommended to use Docker for running the application as it provides a consistent and isolated environment. If you choose to run the application without Docker, ensure that you have a compatible PostgreSQL database configured and update the database connection details accordingly.


That's it! You now have the Simple User Management project up and running using Docker. Feel free to explore the code, make modifications, and enhance the functionality as per your requirements.