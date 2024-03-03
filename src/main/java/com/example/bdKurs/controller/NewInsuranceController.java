package com.example.bdKurs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import java.util.List;

@Controller
public class NewInsuranceController {


//    @Autowired
//    public NewInsuranceController(TypeInsuranceService typeInsuranceService){
//        this.typeInsuranceService = typeInsuranceService;
//    }
    @GetMapping("/newInsurance")
    public String newInsurance() {
        return "createNewInsurance";
    }
}