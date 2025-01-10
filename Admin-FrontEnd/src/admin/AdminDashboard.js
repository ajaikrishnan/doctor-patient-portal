import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getDoctorCount,
  getUserCount,
  getAppointmentCount,
  getSpecialistCount,
} from '../api/Service'; // Import API functions
import mediallogo from '../image/medical-symbol.png';
import dashlogo from '../image/dashboard.png';
import '../style/Login.css';

const AdminDashboard = () => {
  const [doctorCount, setDoctorCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [specialistCount, setSpecialistCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [
          doctorCountResponse,
          userCountResponse,
          appointmentCountResponse,
          specialistCountResponse,
        ] = await Promise.all([
          getDoctorCount(),
          getUserCount(),
          getAppointmentCount(),
          getSpecialistCount(),
        ]);

        setDoctorCount(doctorCountResponse);
        setUserCount(userCountResponse);
        setAppointmentCount(appointmentCountResponse);
        setSpecialistCount(specialistCountResponse);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data, please try again later');
      }
    };

    fetchCounts();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-light bg-primary">
        <div className="container-fluid d-flex align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img src={dashlogo} alt="Logo" width="50" height="50" />
            <div className="d-inline-block px-3">
              <h3 className="m-0">Dashboard</h3>
            </div>
          </a>
          <div className="d-flex align-items-center px-3">
            <img src={mediallogo} alt="Logo" width="50" height="50" />
            <h6 className="ms-auto">LifeSpring Medical Center</h6>
          </div>
        </div>
      </nav>

      <div className="container p-5">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Welcome Admin</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/add-doctor">Add Doctor</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-specialist">Add Specialist</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/view-doctor-list">View Doctors</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-appointment">View Appointments</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/view_users">View Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn-logout" to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <h2 className="text-center text-danger fs-3 mb-4">Admin Dashboard</h2>

        {/* Error Message */}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Dashboard Counts */}
        <div className="row">
          <div className="col-md-3">
            <div className="card my-card">
              <div className="card-body text-center text-danger">
                <i className="fa-solid fa-user-doctor fa-3x"></i><br />
                <p className="fs-4">Doctors <br />{doctorCount || 'Loading...'}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card my-card">
              <div className="card-body text-center text-danger">
                <i className="fas fa-user-circle fa-3x"></i><br />
                <p className="fs-4">Users <br />{userCount || 'Loading...'}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card my-card">
              <div className="card-body text-center text-danger">
                <i className="fa-solid fa-calendar-check fa-3x"></i><br />
                <p className="fs-4">Appointments <br />{appointmentCount || 'Loading...'}</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card my-card">
              <div className="card-body text-center text-danger">
                <i className="fa-solid fa-user-doctor fa-3x"></i><br />
                <p className="fs-4">Specialists <br />{specialistCount || 'Loading...'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
