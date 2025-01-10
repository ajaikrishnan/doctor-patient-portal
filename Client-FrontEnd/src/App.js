import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword'; 
import Appointment from './components/BookAppointment.js';
import AppointmentLandingPage from "./components/AppointmentLander.js";
import ProtectedRoute from './components/ProtectedRoute';
import HomeLander from './components/HomeLander';
import Footer from './components/Footer';
import DoctorHomeLander from "./components/DoctorHomeLander.js";
import DocotorLogin from "./components/DoctorLogin.js";
import DoctorForgotPassword from "./components/DoctorForgotPassword.js";
import { ToastContainer, toast } from 'react-toastify';
import "./style/App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomeLander />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor_login" element={<DocotorLogin />} />
          <Route path="/doctorhomelander" element={<DoctorHomeLander />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/doctorforgotpassword" element={<DoctorForgotPassword />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/appolander" element={<AppointmentLandingPage />} />
            {/* Other protected routes can go here */}
          </Route>
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
