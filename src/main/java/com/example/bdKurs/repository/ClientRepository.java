package com.example.bdKurs.repository;

import com.example.bdKurs.model.Clients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Clients, Long> {
    @Query(value = "SELECT * FROM clients", nativeQuery = true)
    List<Clients> findAllClients();

    boolean existsByEmail(String email);
}
