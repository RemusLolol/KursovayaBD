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

@Controller
public class NewInsuranceController {
    private final AllInsuranceService allInsuranceService;

     @Autowired
    public NewInsuranceController(AllInsuranceService allInsuranceService){
        this.allInsuranceService = allInsuranceService;
    }

    @GetMapping("/newInsurance")
    public String newInsurance() {
        return "createNewInsurance";
    }

    @PostMapping("/addNewInsurances")
    public ResponseEntity<String> addNewInsurances(@RequestBody Allinsurance allInsurance) {
        try {
            allInsuranceService.addInsurance(allInsurance);
            return ResponseEntity.status(HttpStatus.CREATED).body("Страховка успешно зарегистрирована.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Произошла ошибка при регистрации страховки. Пожалуйста, попробуйте еще раз.");
        }
    }
}