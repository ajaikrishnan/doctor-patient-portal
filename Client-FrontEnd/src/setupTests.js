// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAppointmentById } from '../api/Service'; // Import API service
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components
import "../style/App.css";

const AppointmentLandingPage = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null); // To store selected appointment for modal

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login'); // Redirect if not logged in
        } else {
            const userEmail = JSON.parse(user).email; // Get email from the logged-in user's data
            setEmail(userEmail);
            fetchAppointments(userEmail); // Fetch appointments initially
        }
    }, [navigate]);

    const fetchAppointments = async (email) => {
        setLoading(true); // Set loading to true when fetching
        try {
            const response = await getAllAppointmentById(email); // Pass email as query parameter
            const bookedAppointments = response.data.filter(
                (appointment) => appointment.status === 'Pending' || appointment.status === 'Approved' || appointment.status === 'Rejected'
            );
            setAppointments(bookedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Failed to fetch appointments!');
        } finally {
            setLoading(false); // Stop loading after fetch is complete
        }
    };

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment); // Open the modal with appointment details
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null); // Close the modal
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="appointment-landing-page">
            <div className="container mt-4">
                <h2>Appointment Dashboard</h2>
                
                <h3>Booked Appointments</h3>
                {appointments.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.fullName}</td>
                                    <td>{appointment.email}</td>
                                    <td>
                                        <span
                                            className={`badge ${
                                                appointment.status === 'Approved'
                                                    ? 'bg-success'
                                                    : appointment.status === 'Rejected'
                                                    ? 'bg-danger'
                                                    : 'bg-warning'
                                            }`}
                                        >
                                            {appointment.status}
                                        </span>
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
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No appointments found.</p>
                )}
            </div>

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
};

export default AppointmentLandingPage;
