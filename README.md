# Doctor-Patient Portal

Welcome to the **Doctor-Patient Portal** application! This system allows doctors to log in, view their appointments, and update the status of the appointments (Approve or Reject). Patients can book appointments, and admin users can manage the entire process.

## Features

- **Doctor Login & Dashboard**  
  Doctors can log in using their unique ID and view their appointments. They can approve or reject appointments directly from the dashboard.
  
- **Admin Panel**  
  Admin can log in with the default credentials to manage doctors, patients, and appointments.

- **Patient Appointment Booking**  
  Patients can view available doctors and book appointments with them.

## Tech Stack

### Backend
- **Spring Boot** - A powerful backend framework to handle all API requests.
- **JPA (Java Persistence API)** - For database interaction and managing appointments.

### Frontend
- **React.js** - A modern frontend library to create dynamic user interfaces.
- **Redux** - For state management across the frontend apps.

## Getting Started

To get started with both the backend and frontend, follow the instructions below:

### Prerequisites

**Make sure you have the following installed:**
- [JDK 21](https://jdk.java.net/21) (Required for the Spring Boot backend)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/) or any other code editor (such as Visual Studio Code)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

# Backend (Spring Boot)

1. Clone the repository:
   ```bash
   git clone https://github.com/ajaikrishnan/doctor-patient-portal.git

2. Navigate to the backend directory:
        ```
        cd doctor-patient-portal/backend
        ```
3. Build and run the Spring Boot application:
    ```
    ./mvnw spring-boot:run
    ```

4. The application will start on http://localhost:8080.

# Frontend(React.js)

1. Navigate to the frontend directory:
    ```
    cd doctor-patient-portal/frontend
    ```
2. Install dependencies:
    ```
      npm install
    ```

3. Start the React development server:
     ```
     npm start
    ```
4. The React app will be available at http://localhost:3000.

## Admin Login

Use the following credentials to log in to the Admin panel:

- **Email:** admin@gmail.com
- **Password:** admin


Running Both Frontend and Backend
To run both frontend and backend together, ensure that both servers (Spring Boot and React) are running simultaneously. You can use different terminals or code editors with terminal support for each server.

**Directory Structure**

/backend - Contains the Spring Boot backend application.
/frontend - Contains the React.js frontend application.


**Contributing**
We welcome contributions to this project! If you'd like to contribute, feel free to fork the repository and create a pull request.

**License**
This project is licensed under the MIT License - see the LICENSE file for details.

**Contact**
For questions or feedback, feel free to reach out:

Email: kichuser6572@gmail.com







