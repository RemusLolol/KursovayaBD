package com.example.bdKurs.controller;

import com.example.bdKurs.model.Allinsurance;
import com.example.bdKurs.model.Checkedinsurances;
import com.example.bdKurs.service.AllInsuranceService;
import com.example.bdKurs.service.CheckedinsurancesService;
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
    private final CheckedinsurancesService checkedinsurancesService;

     @Autowired
    public NewInsuranceController(AllInsuranceService allInsuranceService, CheckedinsurancesService checkedinsurancesService){
        this.allInsuranceService = allInsuranceService;
        this.checkedinsurancesService = checkedinsurancesService;
     }

    @GetMapping("/newInsurance")
    public String newInsurance() {
        return "createNewInsurance";
    }

    @PostMapping("/addNewInsurances")
    public ResponseEntity<String> addNewInsurances(@RequestBody Allinsurance allInsurance) {
        try {
            allInsuranceService.addInsurance(allInsurance);

            Checkedinsurances checkedInsurance = new Checkedinsurances();
            checkedInsurance.setId_document_insurances(allInsurance.getId());
            checkedInsurance.setStatusCheckedInsured(allInsurance.getStatuscheckedinsured());
            checkedInsurance.setInsurance_claim_check("Не подтверждено");
            checkedInsurance.setPayment_verification_check("Не выплачено");

            checkedinsurancesService.saveCheckedInsurance(checkedInsurance);

            return ResponseEntity.status(HttpStatus.CREATED).body("Страховка успешно зарегистрирована.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Произошла ошибка при регистрации страховки. Пожалуйста, попробуйте еще раз.");
        }
    }
}