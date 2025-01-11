package com.hms.HospitalManagement.Controller;

import com.hms.HospitalManagement.Entity.Doctor;
import com.hms.HospitalManagement.ServiceInterface.DoctorService;
import com.hms.HospitalManagement.ServiceInterface.AppoinmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
//@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.2:3000" , "http://localhost:3001"})

@RestController
@RequestMapping("/doctors")
public class DoctorController {
    @Autowired
    private DoctorService doctorService;

    @Autowired
    private AppoinmentService appointmentService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        Doctor doctor = doctorService.login(email, password);
        if (doctor != null) {
            return ResponseEntity.ok(doctor);
        } else {
            return ResponseEntity.status(401).body("Invalid email or password.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Doctor> getDoctor(@PathVariable int id) {
        Optional<Doctor> doctor = doctorService.getDoctorById(id);
        return doctor
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).build());
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateProfile(@PathVariable int id, @RequestBody Doctor doctor) {
        if (id != doctor.getId()) {
            return ResponseEntity.badRequest().body("Doctor ID mismatch.");
        }
        Doctor updatedDoctor = doctorService.updateProfile(doctor);
        return ResponseEntity.ok(updatedDoctor);
    }

    @PostMapping("/{email}/changePassword")
    public ResponseEntity<?> changePassword(
            @PathVariable String email,  // Change this to String
            @RequestParam String oldPassword,
            @RequestParam String newPassword) {
        boolean isUpdated = doctorService.changePasswordByEmail(email, oldPassword, newPassword);
        if (isUpdated) {
            return ResponseEntity.ok("Password updated successfully.");
        } else {
            return ResponseEntity.status(400).body("Old password is incorrect.");
        }
    }



    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // You can clear any session-related data here if needed.
        return ResponseEntity.ok("Logged out successfully.");
    }



    @GetMapping("/count")
    public long getTotalDoctorCount() {
        return doctorService.getTotalDoctorCount();  // Return the total appointment count
    }


}





