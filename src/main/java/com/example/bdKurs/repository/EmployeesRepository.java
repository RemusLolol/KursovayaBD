package com.example.bdKurs.repository;

import com.example.bdKurs.model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface EmployeesRepository extends JpaRepository<Employees, Long> {

    @Query(value = "SELECT * FROM employees", nativeQuery = true)
    List<Employees> findAllEmployees();

    @Query(value = "SELECT CASE WHEN COUNT(e) > 0 THEN TRUE ELSE FALSE END FROM Employees e WHERE e.email = :email")
    boolean existsByEmailEmployees(String email);

    @Query(value = "SELECT CASE WHEN COUNT(e) > 0 THEN TRUE ELSE FALSE END FROM Employees e WHERE e.email = :email AND e.password_hash = :password")
    boolean existsByEmailAndPassword(String email, String password);
}
