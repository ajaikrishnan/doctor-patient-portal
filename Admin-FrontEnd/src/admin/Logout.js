import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('adminToken'); // Clear the token
    navigate('/login'); // Redirect to login page
  }, [navigate]);

  return null; // No need to render anything
}
