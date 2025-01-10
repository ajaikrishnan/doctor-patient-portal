package com.hms.HospitalManagement.Repository;

import com.hms.HospitalManagement.Entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor ,Integer> {
    Doctor findByEmailAndPassword(String email ,String password);
    boolean existsByIdAndPassword(int id, String password);
    long count();
    Optional<Doctor> findByEmail(String email);
}
