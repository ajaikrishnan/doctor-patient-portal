package com.hms.HospitalManagement.Controller;

import com.hms.HospitalManagement.Entity.Specialist;
import com.hms.HospitalManagement.ServiceInterface.SpecialistService;
import com.hms.HospitalManagement.ServiceInterface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = {"http://localhost:3000", "http://192.168.1.2:3000" , "http://localhost:3001"})

@RestController
@RequestMapping("/specialist")
public class SpecialistController {
    @Autowired
    private SpecialistService specialistService;



    @GetMapping("/count")
    public long getTotalSpecialistCount() {
        return specialistService.getTotalSpecialistCount();  // Return the total appointment count
    }
    @GetMapping("/all")
    public List<Specialist> getAllSpecialists() {
        return specialistService.getAllSpecialists();  // Fetch all specialists from service
    }
    @DeleteMapping("/{id}")
    public String deleteSpecialist(@PathVariable int id) {
        boolean isDeleted = specialistService.deleteSpecialist(id);
        if (isDeleted) {
            return "Specialist with ID " + id + " deleted successfully.";
        } else {
            return "Specialist with ID " + id + " not found.";
        }
    }
}
