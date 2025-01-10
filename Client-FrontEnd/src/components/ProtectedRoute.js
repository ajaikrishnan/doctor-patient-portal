import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const auth = useAuth(); // Call the useAuth function

    return auth ? <Outlet /> : <Navigate to="/login" />;
};


const useAuth = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        try {
            JSON.parse(storedUser);
            return true; // Return true if user data is present and valid
        } catch (error) {
            console.error("Error parsing user data:", error);
            localStorage.removeItem('user'); // Clear corrupted data
            return false;
        }
    }
    return false; // Return false if no user data is found
};

export default ProtectedRoute;