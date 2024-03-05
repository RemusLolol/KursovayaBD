package com.example.bdKurs.controller;

import com.example.bdKurs.model.Clients;
import com.example.bdKurs.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;

@Controller
public class InfoForAccountController {

    private final ClientService clientService;

    @Autowired
    public InfoForAccountController(ClientService clientService) {
        this.clientService = clientService;
    }

    @GetMapping("/infoForAccount")
    public String infoForAccount(){
        return "infoForAcc";
    }

    @PostMapping("/getInfoForAccount")
    public ResponseEntity<Clients> getInfoForAccount(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        Clients clientsEmail = clientService.getClientByEmail(email);
        if (clientsEmail != null) {
            System.out.println(clientsEmail.getClientname());
            System.out.println(clientsEmail.getClientsurname());
            System.out.println(clientsEmail.getEmail());
            return new ResponseEntity<>(clientsEmail, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
