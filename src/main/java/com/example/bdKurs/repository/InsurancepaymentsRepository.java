package com.example.bdKurs.repository;

import com.example.bdKurs.model.Employees;
import com.example.bdKurs.model.Insurancepayments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InsurancepaymentsRepository extends JpaRepository<Insurancepayments, Long> {

    @Query(value = "SELECT * FROM insurancePayments", nativeQuery = true)
    List<Insurancepayments> findAllInsurancePayments();
}