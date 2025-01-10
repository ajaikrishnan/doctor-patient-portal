import React, { useEffect, useState } from 'react';
import { getAppointmentList, getDoctorById, deleteAppointment } from '../api/Service';
import mediallogo from '../image/medical-symbol.png';
import dashlogo from '../image/dashboard.png';
import '../style/Login.css';

export default function ViewAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState({});

  // Fetch appointments and doctors' names
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const result = await getAppointmentList();
        setAppointments(result.data);
        // Get all doctors based on doctorId
        result.data.forEach((appointment) => {
          getDoctorById(appointment.doctorId)
            .then((doctorRes) => {
              setDoctors((prevDoctors) => ({
                ...prevDoctors,
                [appointment.doctorId]: doctorRes.data
              }));
            })
            .catch((error) => console.error('Error fetching doctor:', error));
        });
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  // Function to delete appointment
  const handleDelete = async (appointmentId) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
      alert('Appointment deleted successfully');
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert('Failed to delete appointment');
    }
  };

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
      <div className="container">
        <h2 className="my-4 text-center">All Appointments</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>No</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Appointment Date</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Diseases</th>
              <th>Doctor</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => {
              const doctor = doctors[appointment.doctorId];
              return (
                <tr key={appointment.id}>
                  <td>{index + 1}</td>
                  <td>{appointment.fullName}</td>
                  <td>{appointment.gender}</td>
                  <td>{appointment.age}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.phone}</td>
                  <td>{appointment.diseases}</td>
                  <td>{doctor ? `${doctor.fullName} (${doctor.specialist})` : 'Loading...'}</td>
                  <td>{appointment.address}</td>
                  <td
                    className={
                      appointment.status === 'Approved'
                        ? 'bg-success text-white'  // Green for Approved
                        : appointment.status === 'Rejected'
                        ? 'bg-danger text-white'  // Red for Rejected
                        : appointment.status === 'Pending'
                        ? 'bg-warning text-dark'  // Yellow for Pending
                        : ''
                    }
                  >
                    {appointment.status}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(appointment.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
