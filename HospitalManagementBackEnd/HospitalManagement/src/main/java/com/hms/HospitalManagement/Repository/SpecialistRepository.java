package com.hms.HospitalManagement.Repository;

import com.hms.HospitalManagement.Entity.Specialist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialistRepository extends JpaRepository<Specialist,Integer> {
    long count();
}
