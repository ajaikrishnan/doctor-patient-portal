import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';
import { registerUser } from '../api/Service'; // Import the API service function

const Register = () => {
    const [user, setUser] = useState({ email: '', name: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const notify = () => {
        toast.success('Registration successful!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    };

    const errorNotify = () => {
        toast.error('Registration failed:', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        try {
            const response = await registerUser(user);
            if (response.status === 201) {
                notify();
                setTimeout(() => navigate('/login'), 1000);
            }
        } catch (error) {
            console.error("Registration error:", error);
            if (error.response) {
                if (error.response.status === 409) {
                    setMessage(error.response.data.message);
                    errorNotify();
                } else {
                    errorNotify();
                    setMessage(`Registration failed: ${error.response.data.message || error.message}`);
                }
            } else {
                setMessage('Registration failed: Network error. Please check your connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid d-flex py-1 m-4 justify-content-center align-items-center">
            <div className="login-container d-flex flex-column align-items-center justify-content-center shadow rounded py-5 px-5">
                <h2>Register</h2>
                {loading && <p>Loading...</p>}
                {message && <p className={message.startsWith('Registration successful') ? "text-success" : "text-danger"}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={user.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
