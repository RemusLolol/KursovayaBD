package com.example.bdKurs.model;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InsuranceChangesRequest {
    private Insurancepayments insurancepayment;
    private Checkedinsurances checkedinsurances;
}
