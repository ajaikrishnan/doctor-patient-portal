package com.hms.HospitalManagement.ServiceInterface;

import com.hms.HospitalManagement.Entity.Appointment;
import com.hms.HospitalManagement.Exception.AppointmentNotFoundException;

import java.util.List;

public interface AppoinmentService {
    Appointment addAppointment(Appointment appointment);
    List<Appointment> getAllAppointments();
    boolean updateStatus(int appointmentId, String status);
    long getTotalAppointmentCount();
    List<Appointment> getAppointmentsByEmail(String email);
    Appointment updateAppointmentDetails(Appointment updatedAppointment);
    List<Appointment> getAppointmentsByDoctorId(int doctorId);
    void deleteAppointment(int id) throws AppointmentNotFoundException;


}
