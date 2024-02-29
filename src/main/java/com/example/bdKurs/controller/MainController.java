package com.example.bdKurs.controller;

import com.example.bdKurs.model.Clients;
import com.example.bdKurs.model.Employees;
import com.example.bdKurs.service.ClientService;
import com.example.bdKurs.service.EmployeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
public class MainController {

    private final ClientService clientService;
    private final EmployeesService employeesService;

    @Autowired
    public MainController(ClientService clientService, EmployeesService employeesService) {
        this.clientService = clientService;
        this.employeesService = employeesService;
    }

    @GetMapping("/main")
    public String clientsRegPage() {
        return "mainWindow";
    }

    @PostMapping("/registerClient")
    public ResponseEntity<String> registerClient(@RequestBody Clients client) {
        if (clientService.clientExistsByEmail(client.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Client with this email already exists");
        }
        clientService.registerClient(client);
        return ResponseEntity.status(HttpStatus.OK).body("Registration successful");
    }

    @PostMapping("/registerEmployee")
    public ResponseEntity<String> registerEmployee(@RequestBody Employees employees){
        if (employeesService.employeeExistsByEmail(employees.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Client with this email already exists");
        }
        employeesService.registerEmployees(employees);
        return ResponseEntity.status(HttpStatus.OK).body("Registration successful");
    }

    @PostMapping("/loginClient")
    public ResponseEntity<String> loginClient(@RequestBody Clients client) {
        if (clientService.clientExistsByEmailAndPassword(client.getEmail(), client.getPassword_hash())) {
            return ResponseEntity.status(HttpStatus.OK).body("Login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed. Invalid email or password.");
        }
    }

//    @PostMapping("/loginEmployee")
//    public ResponseEntity<String> loginEmployee(@RequestBody Employees employee) {
//        if (employeesService.authenticateEmployee(employee.getEmail(), employee.getPassword_hash())) {
//            return ResponseEntity.status(HttpStatus.OK).body("Login successful");
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed. Invalid email or password.");
//        }
//    }
}