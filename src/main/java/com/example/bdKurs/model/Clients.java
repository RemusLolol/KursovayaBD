package com.example.bdKurs.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Clients {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientname;
    private String clientsurname;
    private Date dateofbirth;
    private char sex;
    private String address;
    private String phonenumber;
    private String email;
    private String password_hash;
}
