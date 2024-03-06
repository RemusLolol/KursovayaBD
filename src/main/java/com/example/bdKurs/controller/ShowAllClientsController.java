package com.example.bdKurs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ShowAllClientsController {

    @GetMapping("/showAllClients")
    public String showAllClients(){
        return "showAllClients";
    }
}
