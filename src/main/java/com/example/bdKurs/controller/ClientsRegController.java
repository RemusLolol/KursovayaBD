package com.example.bdKurs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ClientsRegController {

    @GetMapping("/clientsReg")
    public String clientsRegPage() {
        return "clientsReg";
    }
}
