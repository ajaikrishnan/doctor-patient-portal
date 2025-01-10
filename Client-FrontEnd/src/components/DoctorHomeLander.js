import React, { useEffect, useState } from 'react';
import { getAppointmentsByDoctorId, updateAppointmentStatus } from '../api/Service'; // Ensure the API calls are defined
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap'; // Bootstrap modal components

export default function DoctorHomeLander() {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null); // To store selected appointment for detailed view

  const doctorId = JSON.parse(localStorage.getItem('doctor'))?.id; // Get logged-in doctor's ID

  // Fetch appointments when the component mounts
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getAppointmentsByDoctorId(doctorId); // Fetch appointments by doctor ID
        setAppointments(response.data);
      } catch (err) {
        setError('Failed to fetch appointments. Please try again.');
      }
    };

    if (doctorId) {
      fetchAppointments();
    } else {
      setError('Doctor is not logged in.');
    }
  }, [doctorId]);

  // Handle changing the status of an appointment
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await updateAppointmentStatus(appointmentId, newStatus); // Call the status update API
      if (response.data) {
        toast.success('Appointment status updated!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce,
        });
        // Update appointment status in the UI
        setAppointments((prevAppointments) =>
          prevAppointments.map((appointment) =>
            appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
          )
        );
      } else {
        setError('Failed to update status.');
      }
    } catch (err) {
      setError('Failed to update appointment status.');
    }
  };

  // Handle the popup for viewing full appointment details
  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  // Close the popup
  const handleCloseModal = () => {
    setSelectedAppointment(null);
  };

  // Function to determine the status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'orange';
      case 'Approved':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div className="container mt-5 pt-5  mb-5">
      <h3>Doctor's Appointments</h3>
      {error && <p className="text-danger">{error}</p>}
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Appointment Date</th>
            <th>Status</th>
            <th>Action</th>
            <th>Details</th> {/* Added details column */}
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.fullName}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                <td style={{ color: getStatusColor(appointment.status) }}>
                  {appointment.status}
                </td>
                <td>
                  {appointment.status === 'Pending' && (
                    <div>
                      <button
                        className="btn btn-success mx-1"
                        onClick={() => handleStatusChange(appointment.id, 'Approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() => handleStatusChange(appointment.id, 'Rejected')}
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {appointment.status === 'Approved' && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleStatusChange(appointment.id, 'Rejected')}
                    >
                      Reject
                    </button>
                  )}

                  {appointment.status === 'Rejected' && (
                    <button
                      className="btn btn-success"
                      onClick={() => handleStatusChange(appointment.id, 'Approved')}
                    >
                      Approve
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewDetails(appointment)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Viewing Appointment Details */}
      <Modal show={selectedAppointment !== null} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Appointment Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAppointment && (
            <div>
              <p><strong>Patient Name:</strong> {selectedAppointment.fullName}</p>
              <p><strong>Gender:</strong> {selectedAppointment.gender}</p>
              <p><strong>Age:</strong> {selectedAppointment.age}</p>
              <p><strong>Appointment Date:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}</p>
              <p><strong>Email:</strong> {selectedAppointment.email}</p>
              <p><strong>Phone:</strong> {selectedAppointment.phone}</p>
              <p><strong>Diseases:</strong> {selectedAppointment.diseases}</p>
              <p><strong>Address:</strong> {selectedAppointment.address}</p>
              <p><strong>Note:</strong> {selectedAppointment.note}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
