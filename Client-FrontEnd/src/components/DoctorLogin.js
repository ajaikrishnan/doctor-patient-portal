import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginDoctor } from '../api/Service'; // Make sure this is your login API
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

export default function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const notify = () => {
    toast.success('Logged In..!', {
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
  };

  // Handle doctor login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginDoctor(email, password); // Call login API

      if (response.data) {
        // Store doctor data including the id in localStorage
        localStorage.setItem('doctor', JSON.stringify(response.data)); // Store doctor data
        notify();
        navigate('/doctorhomelander'); // Redirect to doctor home page
      } else {
        setError('Invalid Username or Password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="container-fluid d-flex py-5 m-1 justify-content-center align-items-center">
      <div className="login-container d-flex flex-column align-items-center justify-content-center shadow rounded py-5 px-5">
        <h2>Doctor Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form><br></br>
        <a href="/doctorforgotpassword">Change Password?</a>
      </div>
    </div>
  );
}
