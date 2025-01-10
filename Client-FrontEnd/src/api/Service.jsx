import axios from 'axios';


const BASE_URL = 'http://localhost:8080';

const USER_API_URL = `${BASE_URL}/users`;
const ADMIN_API_URL = `${BASE_URL}/admin`;
const APPOINTMENT_API_URL = `${BASE_URL}/appointments`;
const DOCTOR_API_URL = `${BASE_URL}/doctors`;

export const DoctorchangePassword = async (email, oldPassword, newPassword) => {
  try {
    const response = await axios.post(
      `${DOCTOR_API_URL}/${email}/changePassword`,
      null, // No body, as parameters are passed in the URL
      {
        params: {
          oldPassword: oldPassword,
          newPassword: newPassword
        }
      }
    );
    return response;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};

export const getAllAppointments = async () => {
  try {
    const response = await axios.get(`${APPOINTMENT_API_URL}/doctor/2`); // Use the correct URL for fetching
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateAppointmentStatus = async (appointmentId, newStatus) => {
  try {
    const response = await axios.patch(`${APPOINTMENT_API_URL}/updateStatus`, null, {
      params: { id: appointmentId, status: newStatus }
    });
    return response;
  } catch (error) {
    console.error('Error updating appointment status:', error);
    throw error;
  }
};

export const getAppointmentsByDoctorId = async (doctorId) => {
  try {
    const response = await axios.get(`${APPOINTMENT_API_URL}/doctor/${doctorId}`);
    return response;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

export const getAllAppointmentById = (email) => {
  return axios.post(`${APPOINTMENT_API_URL}/appoint_list`, null, {
    params: { email }
  });
};

export const bookAppointment = (appointment) => {
  return axios.post(`${APPOINTMENT_API_URL}/add`, appointment);
};

export const getAllDoctors = () => {
  return axios.get(`${ADMIN_API_URL}/all_doctors`);
};

export const loginUser = (email, password) => {
  return axios.post(`${USER_API_URL}/login`, { email, password });
};

export const registerUser = (user) => {
  return axios.post(`${USER_API_URL}/register`, { user });
};

export const changePassword = (email, oldPassword, newPassword) => {
  return axios.post(`${USER_API_URL}/change-password`, { email, oldPassword, newPassword });
};

export const loginDoctor = async (email, password) => {
  try {
    const response = await axios.post(`${DOCTOR_API_URL}/login`, { email, password });
    return response;
  } catch (error) {
    console.error('Error logging in doctor:', error);
    throw error;
  }
};

export const getDoctorById = (id) => {
  return axios.get(`${DOCTOR_API_URL}/${id}`);
};

export const updateDoctorProfile = (id, doctor) => {
  return axios.put(`${DOCTOR_API_URL}/${id}`, doctor);
};

export const changeDoctorPassword = (id, oldPassword, newPassword) => {
  return axios.post(`${DOCTOR_API_URL}/${id}/changePassword`, null, {
    params: { oldPassword, newPassword }
  });
};

export const logoutDoctor = () => {
  return axios.post(`${DOCTOR_API_URL}/logout`);
};

export const getTotalDoctorCount = () => {
  return axios.get(`${DOCTOR_API_URL}/count`);
};
