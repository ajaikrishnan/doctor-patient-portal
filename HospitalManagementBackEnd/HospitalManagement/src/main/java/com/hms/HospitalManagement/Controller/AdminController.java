package com.hms.HospitalManagement.Controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hms.HospitalManagement.Entity.Doctor;
import com.hms.HospitalManagement.Entity.Specialist;
import com.hms.HospitalManagement.ServiceInterface.DoctorService;
import com.hms.HospitalManagement.ServiceInterface.SpecialistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
//@CrossOrigin(origins = {"http://localhost:3000" , "http://localhost:3001"})

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private DoctorService doctorService;

    @Autowired
    private SpecialistService specialistService;

    @PostMapping("/admin_login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        if ("admin@gmail.com".equals(email) && "admin".equals(password)) {
            return ResponseEntity.ok("Admin logged in successfully");
        }
        return ResponseEntity.status(401).body("Invalid Username or Password");
    }

    // Add Doctor
    @PostMapping("/add_doctor")
    public ResponseEntity<Doctor> addDoctor(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(doctorService.addDoctor(doctor));
    }

    // Update Doctor
    @PutMapping("/update_doctor")
    public ResponseEntity<Doctor> updateDoctor(@RequestBody Doctor doctor) {
        return ResponseEntity.ok(doctorService.updateDoctor(doctor));
    }

    // Delete Doctor
    @DeleteMapping("/del_doctor/{id}")
    public ResponseEntity<?> deleteDoctor(@PathVariable int id) {
        if (doctorService.deleteDoctor(id)) {
            return ResponseEntity.ok("Doctor deleted successfully");
        }
        return ResponseEntity.status(404).body("Doctor not found");
    }

    // Get All Doctors
    @GetMapping("/all_doctors")
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @PostMapping("/specialist")
    public ResponseEntity<Specialist> addSpecialist(@RequestBody String name) {
        // Check if the incoming data is a JSON string like {"name": "cardio"}
        try {
            // Try parsing the string to a JSON object
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(name);

            // If it contains a "name" field, extract it
            if (jsonNode.has("name")) {
                name = jsonNode.get("name").asText();
            }
        } catch (Exception e) {
            // If it's not a JSON object, we assume it's just the name string
            // Proceed with the plain string as name
        }

        // Proceed to add the specialist with the correct name
        Specialist specialist = specialistService.addSpecialist(name);
        return ResponseEntity.ok(specialist);
    }
}




