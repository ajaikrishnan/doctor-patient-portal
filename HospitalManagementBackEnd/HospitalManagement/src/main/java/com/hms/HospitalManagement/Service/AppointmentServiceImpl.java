package com.hms.HospitalManagement.Service;

import com.hms.HospitalManagement.Entity.Appointment;
import com.hms.HospitalManagement.Exception.AppointmentNotFoundException;
import com.hms.HospitalManagement.Repository.AppointmentRepository;
import com.hms.HospitalManagement.ServiceInterface.AppoinmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentServiceImpl implements AppoinmentService {
    @Autowired
    private AppointmentRepository appointmenttepository;

    @Override
    public Appointment addAppointment(Appointment appointment) {
        return appointmenttepository.save(appointment);

    }

    @Override
    public List <Appointment> getAllAppointments(){
        return appointmenttepository.findAll();
    }



    @Override
    public long getTotalAppointmentCount() {
        return appointmenttepository.count();  // Get the total count of appointments
    }

    @Override
    public List<Appointment> getAppointmentsByEmail(String email) {
        return appointmenttepository.findByEmail(email); // Fetch appointments by email
    }

    @Override
    public Appointment updateAppointmentDetails(Appointment updatedAppointment) {
        Optional<Appointment> optionalAppointment = appointmenttepository.findById(updatedAppointment.getId());
        if (optionalAppointment.isPresent()) {
            Appointment existingAppointment = optionalAppointment.get();

            // Update all fields
            existingAppointment.setUserId(updatedAppointment.getUserId());
            existingAppointment.setFullName(updatedAppointment.getFullName());
            existingAppointment.setGender(updatedAppointment.getGender());
            existingAppointment.setAge(updatedAppointment.getAge());
            existingAppointment.setAppointmentDate(updatedAppointment.getAppointmentDate());
            existingAppointment.setEmail(updatedAppointment.getEmail());
            existingAppointment.setPhone(updatedAppointment.getPhone());
            existingAppointment.setDiseases(updatedAppointment.getDiseases());
            existingAppointment.setDoctorId(updatedAppointment.getDoctorId());
            existingAppointment.setAddress(updatedAppointment.getAddress());
            existingAppointment.setStatus(updatedAppointment.getStatus());

            // Save the updated appointment
            return appointmenttepository.save(existingAppointment);
        }
        return null; // Return null if appointment does not exist
    }
    @Override
    public List<Appointment> getAppointmentsByDoctorId(int doctorId) {
        return appointmenttepository.findByDoctorId(doctorId);
    }

    @Override
    public boolean updateStatus(int appointmentId, String status) {
        Optional<Appointment> optionalAppointment = appointmenttepository.findById(appointmentId);
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setStatus(status);
            appointmenttepository.save(appointment);
            return true;
        }
        return false;
    }

    @Override
    public void deleteAppointment(int id) throws AppointmentNotFoundException {
        Optional<Appointment> appointment = appointmenttepository.findById(id);
        if (appointment.isPresent()) {
            appointmenttepository.delete(appointment.get()); // Delete the appointment
        } else {
            throw new AppointmentNotFoundException("Appointment not found with id: " + id); // If not found, throw exception
        }
    }







}
