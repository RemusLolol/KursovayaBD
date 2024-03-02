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

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Clients c WHERE c.email = :email AND c.password_hash = :passwordHash")
    boolean existsByEmailAndPasswordClients(String email, String passwordHash);
}
