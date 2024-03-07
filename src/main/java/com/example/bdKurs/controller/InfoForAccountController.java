package com.example.bdKurs.controller;

import com.example.bdKurs.model.Clients;
import com.example.bdKurs.model.Employees;
import com.example.bdKurs.repository.EmployeesRepository;
import com.example.bdKurs.service.ClientService;
import com.example.bdKurs.service.EmployeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpStatus;
import java.util.Map;

@Controller
public class InfoForAccountController {

    private final ClientService clientService;
    private final EmployeesService employeesService;

    @Autowired
    public InfoForAccountController(ClientService clientService, EmployeesService employeesService) {
        this.clientService = clientService;
        this.employeesService = employeesService;
    }

    @GetMapping("/infoForAccount")
    public String infoForAccount(){
        return "infoForAcc";
    }

    @PostMapping("/getInfoForAccountClient")
    public ResponseEntity<Clients> getInfoForAccountClient(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        Clients clientsEmail = clientService.getClientByEmail(email);
        if (clientsEmail != null) {
            return new ResponseEntity<>(clientsEmail, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("getInfoForAccountEmployee")
    public ResponseEntity<Employees> getInfoForAccountEmployee(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        Employees employeesEmail = employeesService.getEmployeeByEmail(email);
        if (employeesEmail != null) {
            return new ResponseEntity<>(employeesEmail, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}