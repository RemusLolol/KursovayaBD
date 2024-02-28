package com.example.bdKurs.repository;

// EmployeesRepository.java
import com.example.bdKurs.model.Employees;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface EmployeesRepository extends JpaRepository<Employees, Long> {

    @Query(value = "SELECT * FROM employees", nativeQuery = true)
    List<Employees> findAllEmployees();
}
