package com.example.bdKurs.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AllInsurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientemail;
    private String typeface;
    private String typeinsurance;
    private Float suninsured;
    private Date contract_start_date;
    private Date contract_end_date;
    private String statuscheckedinsured;
}
