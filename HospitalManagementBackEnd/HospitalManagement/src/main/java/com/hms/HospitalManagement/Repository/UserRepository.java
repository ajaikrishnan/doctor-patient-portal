package com.hms.HospitalManagement.Repository;

import com.hms.HospitalManagement.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    User findByEmailAndPassword(String email, String password);
//    User findByEmail(String email);
    Optional<User> findByEmail(String email);
    long count();
}
