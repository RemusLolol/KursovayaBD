package com.example.bdKurs.controller;

import com.example.bdKurs.model.Clients;
import com.example.bdKurs.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class mainWindowController {

    private final ClientService clientService;

    @Autowired
    public mainWindowController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/main")
    public String clientsRegPage() {
        return "mainWindow";
    }

    @PostMapping("/registerClient")
    public ResponseEntity<String> registerClient(@RequestBody Clients client) {
        clientService.registerClient(client);
        return ResponseEntity.status(HttpStatus.OK).body("Registration successful");
    }
}