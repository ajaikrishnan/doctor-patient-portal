package com.hms.HospitalManagement.Service;

import com.hms.HospitalManagement.Entity.User;
import com.hms.HospitalManagement.Exception.UserAlreadyExistsException;
import com.hms.HospitalManagement.Repository.UserRepository;
import com.hms.HospitalManagement.ServiceInterface.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User registerUser(User user) throws UserAlreadyExistsException {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new UserAlreadyExistsException("Email already exists.");
        }

        // NO PASSWORD HASHING - VERY INSECURE!
        // DO NOT DO THIS IN PRODUCTION
        // user.setPassword(user.getPassword()); // No hashing

        return userRepository.save(user);
    }

    @Override
    public User loginUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password);
    }

    @Override
    public boolean changePassword(String email, String oldPassword, String newPassword) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(oldPassword)) { // Direct comparison - INSECURE
                user.setPassword(newPassword);
                userRepository.save(user);
                return true;
            }
        }
        return false;
    }

    @Override
    public long getTotalUserCount() {
        return userRepository.count();  // Get the total count of appointments
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    @Override
    public void deleteUser(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("User not found with ID: " + id);
        }
    }
}



