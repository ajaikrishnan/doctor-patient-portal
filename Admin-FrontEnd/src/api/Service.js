import axios from 'axios';

// Define the base URL for your API
const BASE_URL = `${process.env.REACT_APP_API_URL}`;

// Axios instance for API requests
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Fetch doctor count
export const getDoctorCount = async () => {
  try {
    const response = await api.get('/doctors/count');
    return response.data;
  } catch (error) {
    console.error('Error fetching doctor count:', error);
    return 0; // Default to 0 on error
  }
};

// Fetch user count
export const getUserCount = async () => {
  try {
    const response = await api.get('/users/count');
    return response.data;
  } catch (error) {
    console.error('Error fetching user count:', error);
    return 0;
  }
};

// Fetch appointment count
export const getAppointmentCount = async () => {
  try {
    const response = await api.get('/appointments/count');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointment count:', error);
    return 0;
  }
};

// Fetch specialist count
export const getSpecialistCount = async () => {
  try {
    const response = await api.get('/specialist/count');
    return response.data;
  } catch (error) {
    console.error('Error fetching specialist count:', error);
    return 0;
  }
};
// APIs with consolidated base URL
export const deleteUser = async (id) => {
  try {
    await api.delete(`/users/${id}`);
    return "User deleted successfully!";
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users/all_users');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const deleteSpecialist = async (id) => {
  try {
    const response = await api.delete(`/specialist/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting specialist:', error);
    throw error;
  }
};

export const getSpecialists = async () => {
  try {
    const response = await api.get('/specialist/all');
    return response;
  } catch (error) {
    console.error('Error fetching specialists:', error);
    throw error;
  }
};

export const deleteAppointment = async (appointmentId) => {
  try {
    const response = await api.delete(`/appointments/${appointmentId}`);
    return response;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

// Admin APIs
export const loginAdmin = (email, password) => {
  return api.post('/admin/admin_login', { email, password });
};

export const getAllDoctors = () => {
  return api.get('/admin/all_doctors');
};

export const addDoctor = (doctor) => {
  return api.post('/admin/add_doctor', doctor);
};

export const updateDoctor = (doctor) => {
  return api.put('/admin/update_doctor', doctor);
};

export const deleteDoctor = (id) => {
  return api.delete(`/admin/del_doctor/${id}`);
};

export const addSpecialist = (name) => {
  return api.post('/admin/specialist', { name });
};

// Appointment APIs
export const getAppointmentList = () => {
  return api.get('/appointments/get');
};

// Doctor APIs
export const getDoctorById = (id) => {
  return api.get(`/doctors/${id}`);
};
