package com.example.bdKurs.repository;

import com.example.bdKurs.model.Clients;
import com.example.bdKurs.model.Typeinsurances;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypeInsurancesRepository extends JpaRepository<Typeinsurances, Long> {
    @Query(value = "SELECT * FROM typeinsurances", nativeQuery = true)
    List<Typeinsurances> findAllTypeInsurances();

    List<Typeinsurances> findByTypeface(String typeface);

}
