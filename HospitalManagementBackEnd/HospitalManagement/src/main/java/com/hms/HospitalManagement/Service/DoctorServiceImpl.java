package com.hms.HospitalManagement.Service;

import com.hms.HospitalManagement.Entity.Doctor;
import com.hms.HospitalManagement.Repository.AppointmentRepository;
import com.hms.HospitalManagement.Repository.DoctorRepository;
import com.hms.HospitalManagement.ServiceInterface.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private AppointmentRepository appointmenttepository;

    @Override
    public Doctor login(String email,String password){
        return doctorRepository.findByEmailAndPassword(email,password);
    }
    @Override
    public Optional<Doctor> getDoctorById(int id) {
        return doctorRepository.findById(id);
    }
    @Override
    public Doctor updateProfile(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public boolean changePassword(int doctorId, String oldPassword, String newPassword) {
        if (doctorRepository.existsByIdAndPassword(doctorId, oldPassword)) {
            Doctor doctor = doctorRepository.findById(doctorId).orElse(null);
            if (doctor != null) {
                doctor.setPassword(newPassword);
                doctorRepository.save(doctor);
                return true;
            }
        }
        return false;
    }
    @Override
    public Doctor addDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);

    }
    @Override
    public boolean deleteDoctor(int id) {
        if (doctorRepository.existsById(id)) {
            doctorRepository.deleteById(id);
            return true;
        }
        return false;
    }
    @Override
    public Doctor updateDoctor(Doctor doctor) {
        return doctorRepository.save(doctor);
    }

    @Override
    public List<Doctor> getAllDoctors() {
        return doctorRepository.findAll();
    }

    @Override
    public long getTotalDoctorCount() {
        return doctorRepository.count();

        // Get the total count of appointments
    }

    @Override
    public boolean changePasswordByEmail(String email, String oldPassword, String newPassword) {
        // Retrieve doctor by email
        Doctor doctor = doctorRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        // Check if the old password matches
        if (!doctor.getPassword().equals(oldPassword)) {
            return false;  // Old password doesn't match
        }

        // Update with the new password (no encryption)
        doctor.setPassword(newPassword);
        doctorRepository.save(doctor);
        return true;
    }




}



