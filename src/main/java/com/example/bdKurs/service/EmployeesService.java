package com.example.bdKurs.service;

// EmployeesService.java
import com.example.bdKurs.model.Employees;
import com.example.bdKurs.repository.EmployeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EmployeesService {

    private final EmployeesRepository employeesRepository;

    @Autowired
    public EmployeesService(EmployeesRepository employeesRepository) {
        this.employeesRepository = employeesRepository;
    }

    // Метод для получения всех работников
    public List<Employees> getAllEmployees() {
        return employeesRepository.findAllEmployees();
    }
}
