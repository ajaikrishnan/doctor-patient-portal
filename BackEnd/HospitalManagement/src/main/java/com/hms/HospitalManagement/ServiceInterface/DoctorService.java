package com.hms.HospitalManagement.ServiceInterface;

import com.hms.HospitalManagement.Entity.Doctor;

import java.util.List;
import java.util.Optional;

public interface DoctorService  {
    Doctor login(String email, String password);

    Optional<Doctor> getDoctorById(int id);

    Doctor updateProfile(Doctor doctor);

    boolean changePassword(int doctorId, String oldPassword, String newPassword);


    Doctor addDoctor(Doctor doctor);
    boolean deleteDoctor(int id);
    Doctor updateDoctor(Doctor doctor);
    List<Doctor> getAllDoctors();
    long getTotalDoctorCount();
    boolean changePasswordByEmail(String email, String oldPassword, String newPassword);

}