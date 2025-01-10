package com.hms.HospitalManagement.ServiceInterface;

import com.hms.HospitalManagement.Entity.User;
import com.hms.HospitalManagement.Exception.UserAlreadyExistsException;

import java.util.List;

public interface UserService {
    User registerUser(User user) throws UserAlreadyExistsException;;
    User loginUser(String email, String password);
    boolean changePassword(String email, String oldPassword, String newPassword);
    long getTotalUserCount();
    void deleteUser(int id);

    List<User> getAllUsers();
}