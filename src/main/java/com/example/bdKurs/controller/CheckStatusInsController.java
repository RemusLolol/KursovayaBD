package com.example.bdKurs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CheckStatusInsController {

    @GetMapping("/checkStatus")
    public String checkStatus(){
        return "checkStatusInsurances";
    }
}