import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllAppointmentById, getAllDoctors } from '../api/Service'; // Import API services
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap modal components
import "../style/App.css";

const AppointmentLandingPage = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null); // To store selected appointment for modal
    const [doctors, setDoctors] = useState([]); // To store doctors data

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            navigate('/login'); // Redirect if not logged in
        } else {
            try {
                const user = JSON.parse(storedUser);
                setUserName(user.fullName || user.name || user.email);
                toast.info(`Welcome ${user.fullName}`);
                setEmail(user.email);
                fetchAppointments(user.email); // Fetch appointments initially
                fetchDoctors(); // Fetch doctors data
            } catch (error) {
                console.error('Error parsing user data:', error);
                toast.error('Invalid user data! Please log in again.');
                navigate('/login'); // Redirect to login if user data is invalid
            }
        }
    }, [navigate]);

    const fetchAppointments = async (email) => {
        setLoading(true); // Set loading to true when fetching
        try {
            const response = await getAllAppointmentById(email); // Pass email as query parameter
            const bookedAppointments = response.data.filter(
                (appointment) =>
                    appointment.status === 'Pending' ||
                    appointment.status === 'Approved' ||
                    appointment.status === 'Rejected'
            );
            setAppointments(bookedAppointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Failed to fetch appointments!');
        } finally {
            setLoading(false); // Stop loading after fetch is complete
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await getAllDoctors(); // Fetch all doctors
            setDoctors(response.data); // Set doctors data in state
        } catch (error) {
            console.error('Error fetching doctors:', error);
            toast.error('Failed to fetch doctors!');
        }
    };

    const getDoctorById = (doctorId) => {
        const doctor = doctors.find((doc) => doc.id === doctorId);
        return doctor || { fullName: 'Unknown', specialist: 'Unknown' }; // Return 'Unknown' if no doctor is found
    };

    const handleViewDetails = (appointment) => {
        setSelectedAppointment(appointment); // Open the modal with appointment details
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null); // Close the modal
    };

    const handleBookAppointment = () => {
        navigate('/appointment'); // Navigate to the booking page
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Appointment Dashboard</h2>
            {userName && (
                <h3 className="welcome-message">Welcome, {userName}!</h3> // Added class for better styling
            )}
            <div className="appointment-landing-page">
                <div className="container mt-4">
                    
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

                    {/* Book Appointment Button */}
                    <div className="mt-4">
                        <button className="btn btn-primary" onClick={handleBookAppointment}>
                            Book Appointment
                        </button>
                    </div>
                </div>

                {/* Modal for Viewing Appointment Details */}
                <Modal show={selectedAppointment !== null} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Appointment Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedAppointment && (
                            <div>
                                <p>
                                    <strong>Patient Name:</strong> {selectedAppointment.fullName}
                                </p>
                                <p>
                                    <strong>Gender:</strong> {selectedAppointment.gender}
                                </p>
                                <p>
                                    <strong>Age:</strong> {selectedAppointment.age}
                                </p>
                                <p>
                                    <strong>Appointment Date:</strong>{' '}
                                    {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}
                                </p>
                                <p>
                                    <strong>Email:</strong> {selectedAppointment.email}
                                </p>
                                <p>
                                    <strong>Phone:</strong> {selectedAppointment.phone}
                                </p>
                                <p>
                                    <strong>Diseases:</strong> {selectedAppointment.diseases}
                                </p>
                                <p>
                                    <strong>Address:</strong> {selectedAppointment.address}
                                </p>
                                <p>
                                    <strong>Note:</strong> {selectedAppointment.note}
                                </p>
                                <p>
                                    <strong>Status:</strong> {selectedAppointment.status}
                                </p>

                                {/* Display Doctor's Name and Specialization */}
                                {selectedAppointment.doctorId && (
                                    <div>
                                        <p>
                                            <strong>Doctor:</strong>{' '}
                                            {getDoctorById(selectedAppointment.doctorId).fullName}
                                        </p>
                                        <p>
                                            <strong>Specialization:</strong>{' '}
                                            {getDoctorById(selectedAppointment.doctorId).specialist}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default AppointmentLandingPage;
