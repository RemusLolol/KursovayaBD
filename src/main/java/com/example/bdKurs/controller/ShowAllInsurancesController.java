package com.example.bdKurs.controller;

import com.example.bdKurs.model.Allinsurance;
import com.example.bdKurs.service.AllInsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import java.util.List;

@Controller
public class ShowAllInsurancesController {
    private final AllInsuranceService allInsuranceService;

    @Autowired
    public ShowAllInsurancesController(AllInsuranceService allInsuranceService){
        this.allInsuranceService = allInsuranceService;
    }

    @GetMapping("/showAllInsurances")
    public String showAllClients(){
        return "showAllInsurances";
    }

    @PostMapping("/allInsurances")
    public ResponseEntity<List<Allinsurance>> allInsurances(){
        List<Allinsurance> insurances = allInsuranceService.getAllInsurances();
        return new ResponseEntity<>(insurances, HttpStatus.OK);
    }
}
