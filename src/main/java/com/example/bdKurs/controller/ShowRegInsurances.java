package com.example.bdKurs.controller;

import com.example.bdKurs.model.Allinsurance;
import com.example.bdKurs.service.AllInsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.List;
import java.util.Map;

@Controller
public class ShowRegInsurances {

    private final AllInsuranceService allInsuranceService;

    @Autowired
    public ShowRegInsurances(AllInsuranceService allInsuranceService){
        this.allInsuranceService = allInsuranceService;
    }

    @GetMapping("/infoForInsurances")
    public String infoForInsurances(){
        return "showInsurances";
    }

    @PostMapping("/insurancesByEmail")
    public ResponseEntity<List<Allinsurance>> getInsurancesByEmail(@RequestBody Map<String, String> emailMap){
        String email = emailMap.get("email");
        List<Allinsurance> insurances = allInsuranceService.getInsurancesByEmail(email);
        return new ResponseEntity<>(insurances, HttpStatus.OK);
    }

}
