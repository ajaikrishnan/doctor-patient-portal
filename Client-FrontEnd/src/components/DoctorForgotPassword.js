import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DoctorchangePassword } from '../api/Service';  // Import the changePassword API method

export default function DoctorForgotPassword() {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');  // Added confirm password field
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!email || !oldPassword || !newPassword || !confirmNewPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      // Assuming email is the doctor's ID in this case, or pass the actual id
      const response = await DoctorchangePassword(email, oldPassword, newPassword); 
      if (response.status === 200) {
        setSuccessMessage('Password changed successfully. Redirecting to login...');
        setTimeout(() => {
          navigate('/login'); // Redirect after a short delay
        }, 3000); // 3-second delay
      } else {
        if (response.data && response.data.message) {
          setError(response.data.message);
        } else {
          setError('Password change failed. Please try again.');
        }
      }
    } catch (err) {
      setError('An error occurred during password change.');
      console.error("Error during password change:", err);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="login-container d-flex flex-column align-items-center justify-content-center shadow rounded py-4 px-4">
        <h2>Forgot Password</h2>
        {successMessage && <p className="text-success">{successMessage}</p>} {/* Success message display */}
        <form onSubmit={handleSubmit}>
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
            <label className="form-label">Old Password</label>
            <input
              type="password"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger">{error}</p>}
          <button type="submit" className="btn btn-primary w-100">Change Password</button>
        </form>
        
      </div>
    </div>
  );
}
