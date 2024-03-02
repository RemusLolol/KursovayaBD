package com.example.bdKurs.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Employees {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeename;
    private String employeesurname;
    private Date dateofbirth;
    private char sex;
    private String phonenumber;
    private String email;
    private Date hiredate;
    private String position;
    private String department;
    private String password_hash;

    public String toString(){
        return "Email: " + email + " Password: " + password_hash;
    }
}
