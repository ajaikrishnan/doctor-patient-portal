import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { getAllDoctors, bookAppointment } from '../api/Service';  // Import necessary APIs

const Appointment = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState(''); // State to store user's email
    const [doctors, setDoctors] = useState([]); // State for doctors list
    const [selectedDoctor, setSelectedDoctor] = useState(''); // State for selected doctor ID
    const [appointmentDetails, setAppointmentDetails] = useState({
        fullName: '',
        gender: '',
        age: '',
        appointmentDate: '',
        email: '',
        phone: '',
        diseases: '',
        doctorId: '',  // This will hold the doctor's ID
        address: ''
    });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                setUserName(user.fullName || user.name || user.email);
                notify(user.fullName || user.name || user.email);
                setUserEmail(user.email); // Set user's email
                setAppointmentDetails((prevDetails) => ({
                    ...prevDetails,
                    email: user.email, // Prefill email in form
                }));
            } catch (error) {
                console.error("Error parsing user data:", error);
                localStorage.removeItem('user');
                navigate('/login');
            }
        } else {
            navigate('/login');
        }

        // Fetch doctors' data
        getAllDoctors()
            .then(response => {
                setDoctors(response.data); // Populate doctors list from API
            })
            .catch(error => {
                console.error("Error fetching doctors:", error);
            });
    }, [navigate]);

    const notify = (name) => {
        toast.info(`Welcome ${name}`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAppointmentDetails({
            ...appointmentDetails,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const userId = JSON.parse(localStorage.getItem('user')).id; // Assuming userId is stored in localStorage
        const appointmentData = {
            ...appointmentDetails,
            userId: userId, // Adding userId from localStorage
            doctorId: selectedDoctor // Selected doctor ID
        };
    
        bookAppointment(appointmentData)
            .then(response => {
                toast.success("Appointment booked successfully!");
                navigate('/appolander'); // Navigate to the desired route after success
            })
            .catch(error => {
                console.error("Error booking appointment:", error);
                toast.error("Error booking appointment.");
            });
    };
    
    
    if (!userName) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>Appointments</h2>
            {userName && <h3>Welcome, {userName}!</h3>}
            
            <form className="row g-3" onSubmit={handleSubmit}>
                {/* Other form fields */}
                <div className="col-md-6">
                    <label className="form-label">Doctor</label>
                    <select
                        required="required"
                        className="form-control"
                        name="doctorId"
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                    >
                        <option selected="selected" disabled="disabled">---Select Doctor---</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.fullName} ({doctor.specialist})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                        required="required"
                        name="fullName"
                        type="text"
                        placeholder="Enter full name"
                        className="form-control"
                        value={appointmentDetails.fullName}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <select
                        className="form-control"
                        name="gender"
                        value={appointmentDetails.gender}
                        onChange={handleInputChange}
                        required="required"
                    >
                        <option selected="selected" disabled="disabled">---Select Gender---</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <label className="form-label">Age</label>
                    <input
                        required="required"
                        name="age"
                        type="number"
                        placeholder="Enter your Age"
                        className="form-control"
                        value={appointmentDetails.age}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Appointment Date</label>
                    <input
                        required="required"
                        name="appointmentDate"
                        type="date"
                        className="form-control"
                        value={appointmentDetails.appointmentDate}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                        required="required"
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        className="form-control"
                        value={userEmail} // Set logged-in user's email
                        disabled // Disable the field
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                        required="required"
                        name="phone"
                        type="number"
                        placeholder="Enter Mobile no."
                        className="form-control"
                        value={appointmentDetails.phone}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Diseases</label>
                    <input
                        required="required"
                        name="diseases"
                        type="text"
                        placeholder="Enter diseases"
                        className="form-control"
                        value={appointmentDetails.diseases}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="col-md-6">
                    <label className="form-label">Address</label>
                    <input
                        required="required"
                        name="address"
                        type="text"
                        placeholder="Enter address"
                        className="form-control"
                        value={appointmentDetails.address}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-12">
    <label className="form-label">Note</label>
    <textarea
        name="note"
        placeholder="Enter additional notes (optional)"
        className="form-control"
        value={appointmentDetails.note}
        onChange={handleInputChange}
    />
</div>


                <button type="submit">Book Appointment</button>
                <button type="button" onClick={handleLogout}>Logout</button>
            </form>
        </div>
    );
};

export default Appointment;
