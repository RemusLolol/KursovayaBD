package com.example.bdKurs.repository;

import com.example.bdKurs.model.AllInsurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AllInsuranceRepository extends JpaRepository<AllInsurance, Long> {
}
