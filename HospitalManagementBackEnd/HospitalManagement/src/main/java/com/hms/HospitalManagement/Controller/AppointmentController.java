package com.hms.HospitalManagement.Controller;

import com.hms.HospitalManagement.Entity.Appointment;
import com.hms.HospitalManagement.Exception.AppointmentNotFoundException;
import com.hms.HospitalManagement.Service.AppointmentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.2:3000" , "http://localhost:3001"})

@RestController
@RequestMapping("/appointments")
public class AppointmentController {
    @Autowired
    private AppointmentServiceImpl appointmentservice;

    @PostMapping("/add")
    public Appointment addAppointment(@RequestBody Appointment appointment) {
        if (appointment.getStatus() == null) {
            appointment.setStatus("Pending");
        }
        return appointmentservice.addAppointment(appointment);

    }

    @GetMapping("/get")
    public List<Appointment> getAllAppointments(){
        return appointmentservice.getAllAppointments();
    }

    @GetMapping("/count")
    public long getTotalAppointmentCount() {
        return appointmentservice.getTotalAppointmentCount();  // Return the total appointment count
    }

    @PostMapping("/appoint_list")
    public List<Appointment> getAppointmentsForLoggedInUser(@RequestParam String email) {
        return appointmentservice.getAppointmentsByEmail(email);
    }
    @PutMapping("/update")
    public ResponseEntity<String> updateAppointment(@RequestBody Appointment updatedAppointment) {
        Appointment updated = appointmentservice.updateAppointmentDetails(updatedAppointment);
        if (updated != null) {
            return ResponseEntity.ok("Appointment updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found.");
        }
    }
    @GetMapping("/doctor/{doctorId}")
    public List<Appointment> getAppointmentsByDoctorId(@PathVariable int doctorId) {
        return appointmentservice.getAppointmentsByDoctorId(doctorId);
    }

     //http://localhost:8080/appointments/updateStatus?id=1&status=Approved
    @PatchMapping("/updateStatus")
    public ResponseEntity<String> updateStatus(@RequestParam int id, @RequestParam String status) {
        boolean isUpdated = appointmentservice.updateStatus(id, status);
        if (isUpdated) {
            return ResponseEntity.ok("Appointment status updated successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Appointment not found.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable("id") int id) {
        try {
            appointmentservice.deleteAppointment(id); // Call the service to delete appointment
            return ResponseEntity.noContent().build(); // Return 204 No Content if deletion is successful
        } catch (AppointmentNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build(); // Return 404 if appointment is not found
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500 for other errors
        }
    }








}
