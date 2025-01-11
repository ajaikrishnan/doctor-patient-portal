package com.hms.HospitalManagement.Entity;

import jakarta.persistence.*;

@Entity
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int userId;
    private String fullName;
    private String gender;
    private String age;

    @Column(name = "appointmentDate")
    private String appointmentDate;

    private String email;
    private String phone;
    private String diseases;
    private int doctorId;
    private String address;
    private String note;

    @Column(name = "status", nullable = false, columnDefinition = "VARCHAR(255) DEFAULT 'Pending'")
    private String status = "Pending"; // Default value set here

    public Appointment() {
        this.status = "Pending"; // Ensure the default value is applied programmatically
    }

    public Appointment(int userId, String fullName, String gender, String age, String appointmentDate, String email, String phone, String diseases, int doctorId, String address, String status ,String note) {
        this.userId = userId;
        this.fullName = fullName;
        this.gender = gender;
        this.age = age;
        this.appointmentDate = appointmentDate;
        this.email = email;
        this.phone = phone;
        this.diseases = diseases;
        this.doctorId = doctorId;
        this.address = address;
        this.note = note;
        this.status = status != null ? status : "Pending"; // Ensure "Pending" if status is null
    }

    // Getter and setter methods for all fields


    public Appointment(String note) {
        this.note = note;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(String appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDiseases() {
        return diseases;
    }

    public void setDiseases(String diseases) {
        this.diseases = diseases;
    }

    public int getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(int doctorId) {
        this.doctorId = doctorId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    public static class EmailRequest {
        private String email;

        // Getter and Setter
        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }
    }
}
