package com.example.bdKurs.repository;

import com.example.bdKurs.model.Checkedinsurances;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckedinsurancesRepository extends JpaRepository<Checkedinsurances, Long> {
}
