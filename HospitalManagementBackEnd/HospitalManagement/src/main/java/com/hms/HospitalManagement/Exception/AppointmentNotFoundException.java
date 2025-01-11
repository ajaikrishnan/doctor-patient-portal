package com.hms.HospitalManagement.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) // Automatically returns 404 status code

public class AppointmentNotFoundException extends RuntimeException  {
  public AppointmentNotFoundException(String message) {
    super(message);
  }
}