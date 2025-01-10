import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        // Parallel API calls for counts
        const responses = await Promise.all([
          axios.get('http://localhost:8080/doctors/count').catch(() => 0),
          axios.get('http://localhost:8080/users/count').catch(() => 0),
          axios.get('http://localhost:8080/appointments/count').catch(() => 0),
          axios.get('http://localhost:8080/specialist/count').catch(() => 0)
        ]);

        setDoctorCount(responses[0].data || 0);
        setUserCount(responses[1].data || 0);
        setAppointmentCount(responses[2].data || 0);
        setSpecialistCount(responses[3].data || 0);
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
                 <Link className="nav-link btn-logout" to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <h2 className="text-center text-danger fs-3 mb-4">Admin Dashboard</h2>

      {/* Display error message if there's an issue fetching data */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {/* Doctor Count */}
        <div className="col-md-3">
          <div className="card my-card">
            <div className="card-body text-center text-danger">
              <i className="fa-solid fa-user-doctor fa-3x"></i><br />
              <p className="fs-4">Doctors <br />{doctorCount || 'Loading...'}</p>
            </div>
          </div>
        </div>

        {/* User Count */}
        <div className="col-md-3">
          <div className="card my-card">
            <div className="card-body text-center text-danger">
              <i className="fas fa-user-circle fa-3x"></i><br />
              <p className="fs-4">Users <br />{userCount|| 'Loading...'}</p>
            </div>
          </div>
        </div>

        {/* Appointment Count */}
        <div className="col-md-3">
          <div className="card my-card">
            <div className="card-body text-center text-danger">
              <i className="fa-solid fa-calendar-check fa-3x"></i><br />
              <p className="fs-4">Appointments <br />{appointmentCount || 'Loading...'}</p>
            </div>
          </div>
        </div>

        {/* Specialist Count */}
        <div className="col-md-3">
          <div className="card my-card">
            <div className="card-body text-center text-danger">
              <i className="fa-solid fa-user-doctor fa-3x"></i><br />
              <p className="fs-4">Specialists <br />{specialistCount|| 'Loading...'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Adding Specialist */}
      <div className="modal fade" id="addSpecialistModal" tabIndex="-1" aria-labelledby="addSpecialistLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger" id="addSpecialistLabel">Add Specialist</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label className="form-label">Specialist Name</label>
                  <input type="text" className="form-control" placeholder="Enter Specialist Name" />
                </div>
                <div className="text-center mt-2">
                  <button type="submit" className="btn btn-outline-danger">Add</button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
