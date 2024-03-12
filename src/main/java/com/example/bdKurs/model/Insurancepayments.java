package com.example.bdKurs.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Insurancepayments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int id_document_insurances;
    private String insurance_case;
    private String severityinsuredevent;
    private float amount_payment;
}
