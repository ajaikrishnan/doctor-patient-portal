package com.hms.HospitalManagement.Service;

import com.hms.HospitalManagement.Entity.Specialist;
import com.hms.HospitalManagement.Repository.SpecialistRepository;
import com.hms.HospitalManagement.ServiceInterface.SpecialistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialistServiceImpl implements SpecialistService {
    @Autowired
    private SpecialistRepository specialistRepository;

    @Override
    public Specialist addSpecialist(String name) {
        Specialist specialist = new Specialist();
        specialist.setName(name);
        return specialistRepository.save(specialist);
    }

    @Override
    public List<Specialist> getAllSpecialists() {
        return specialistRepository.findAll();
    }

    @Override
    public long getTotalSpecialistCount() {
        return specialistRepository.count();  // Get the total count of appointments
    }
    @Override
    public boolean deleteSpecialist(int id) {
        if (specialistRepository.existsById(id)) {
            specialistRepository.deleteById(id);
            return true;  // Specialist deleted successfully
        }
        return false;  // Specialist not found
    }


}
