package com.hms.HospitalManagement.ServiceInterface;

import com.hms.HospitalManagement.Entity.Specialist;

import java.util.List;

public interface SpecialistService {
    Specialist addSpecialist(String name);
    List<Specialist> getAllSpecialists();
    long getTotalSpecialistCount();
    boolean deleteSpecialist(int id);

}
