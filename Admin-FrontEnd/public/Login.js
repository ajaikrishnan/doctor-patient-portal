import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../api/Service';
import adminimagelogin from '../image/adminlogin.jpg';
import Navicon from '../image/adminDasboard.png';
import mediallogo from '../image/medical-symbol.png';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin(email, password);
      localStorage.setItem('adminToken', 'true'); // You can store a token if using JWT
      navigate('/admindashboard');
    } catch (err) {
      setError('Invalid Username or Password');
    }
  };

  return (
<div>
<nav className="navbar navbar-light bg-primary">
      <div className="container-fluid d-flex align-items-center">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={Navicon} alt="Logo" width="50" height="50" />
          <div className="d-inline-block px-3">
            <h3 className="m-0">Admin Portal</h3>
          </div>
        </a>
        <div className="d-flex align-items-center px-3">
          <img src={mediallogo} alt="Logo" width="50" height="50" />
         <h6 className="ms-auto">LifeSpring Medical Center</h6>
        </div>
      </div>
    </nav>


  <div className="d-flex vh-100">
    {/* Left Section */}
    <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center bg-light ">
      <img 
        src={adminimagelogin}
        alt="Welcome" 
        className="img-fluid mb-4" 
        style={{ maxWidth: '50%' }} 
      />
      <h1 className="text-primary">Welcome to Admin Portal</h1>
      <p className="text-muted">Manage your dashboard efficiently</p>
    </div>

    {/* Right Section */}
    <div className="login-container d-flex align-items-center justify-content-center bg-white shadow" style={{ width: '35%' }}>
      <div className="w-75">
      <h2 className="mb-4 text-center">Admin Login</h2>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  </div>
</div>
  );
}
