import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, changePassword } from '../api/Service';
import { toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const notify =()=>{
    toast.success('Logged In..!', {
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
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      // Check authentication status
      if (response.data.authenticated) {
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
        notify();
        
        navigate('/appolander'); // Redirect to appointment page
      } else {
        setError('Invalid Username or Password');
      }
    } catch (err) {
      toast.error('Login failed. Please try again.!');

      setError('Login failed. Please try again.');
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault(); // Prevent default form submission if present
    setError(''); // Clear any existing error message

    try {
      const response = await changePassword(email, password, 'new_password'); // Replace 'new_password' with the actual new password
      if (response.data.success) { // Assuming the response indicates success
        console.log('Password changed successfully!');
        // Optionally, redirect to a confirmation page or display a success message
      } else {
        setError(response.data.message || 'Password change failed.'); // Use error message from response if available
      }
    } catch (err) {
      setError('Password change failed. Please try again.');
      
    }
  };

  

  return (
    
    <div className="container-fluid d-flex py-5 m-1 justify-content-center align-items-center">
      
      <div className="login-container d-flex flex-column align-items-center justify-content-center shadow rounded py-5 px-5">
        <h2>User Login</h2>
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
        </form>
        <a href="/forgot-password">Forgot Password?</a>
        
      </div>
    </div>
  );
}