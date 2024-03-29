package com.example.bdKurs.repository;

import com.example.bdKurs.model.Allinsurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface AllInsuranceRepository extends JpaRepository<Allinsurance, Long> {
    List<Allinsurance> findAllByClientemail(String clientEmail);
    Optional<Allinsurance> findById(Long id);
}