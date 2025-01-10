package com.hms.HospitalManagement.Repository;

import com.hms.HospitalManagement.Entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment,Integer> {
    long count();
    List<Appointment> findByEmail(String email);
    List<Appointment> findByDoctorId(int doctorId);


}
