package com.example.bdKurs.controller;

import com.example.bdKurs.model.Allinsurance;
import com.example.bdKurs.model.Checkedinsurances;
import com.example.bdKurs.model.Insurancepayments;
import com.example.bdKurs.service.AllInsuranceService;
import com.example.bdKurs.service.CheckedinsurancesService;
import com.example.bdKurs.service.InsurancepaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
public class AddCaseController {

    private final AllInsuranceService allInsuranceService;
    private final InsurancepaymentsService  insurancepaymentsService;
    private final CheckedinsurancesService checkedinsurancesService;

    @Autowired
    public AddCaseController(CheckedinsurancesService checkedinsurancesService, AllInsuranceService allInsuranceService, InsurancepaymentsService insurancepaymentsService){
        this.allInsuranceService = allInsuranceService;
        this.insurancepaymentsService = insurancepaymentsService;
        this.checkedinsurancesService = checkedinsurancesService;
    }

    @GetMapping("/addCase")
    public String addCase(){
        return "addInsurancesCase";
    }

    @PostMapping("/getInsurancesByEmail")
    public ResponseEntity<List<Allinsurance>> getInsurancesByEmail(@RequestBody Map<String, String> emailMap){
        String email = emailMap.get("email");
        List<Allinsurance> insurances = allInsuranceService.getInsurancesByEmail(email);
        return new ResponseEntity<>(insurances, HttpStatus.OK);
    }

    @PostMapping("/getDocumentById")
    public ResponseEntity<Allinsurance> getDocumentByID(@RequestBody Map<String, String> requestBody) {
        Long id = Long.valueOf(requestBody.get("id"));
        Optional<Allinsurance> allinsurance = allInsuranceService.findById(id);
        if (allinsurance.isPresent()) {
            return new ResponseEntity<>(allinsurance.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/addNewInsurancePayment")
    public ResponseEntity<String> addNewInsurancePayment(@RequestBody Insurancepayments insurancePayment) {
        try {
            Insurancepayments savedInsurancePayment = insurancepaymentsService.addInsurancepayment(insurancePayment);
            return ResponseEntity.status(HttpStatus.CREATED).body("Выплата по страховке успешно зарегистрирована.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Произошла ошибка при регистрации выплаты по страховке. Пожалуйста, попробуйте еще раз.");
        }
    }

    @PostMapping("/saveCheckInsurance")
    public ResponseEntity<Void> saveChanges(@RequestBody List<Checkedinsurances> checkedInsurances) {
        for (Checkedinsurances checkedInsurance : checkedInsurances) {
            if (checkedInsurance.getId_document_insurances() == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Optional<Checkedinsurances> existingInsurance = checkedinsurancesService.findById(checkedInsurance.getId_document_insurances());
            if (existingInsurance.isPresent()) {
                existingInsurance.get().setStatusCheckedInsured(checkedInsurance.getStatusCheckedInsured());
                existingInsurance.get().setInsurance_claim_check(checkedInsurance.getInsurance_claim_check());
                existingInsurance.get().setPayment_verification_check(checkedInsurance.getPayment_verification_check());
                checkedinsurancesService.saveCheckedInsurance(existingInsurance.get());
            } else {
                checkedinsurancesService.saveCheckedInsurance(checkedInsurance);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
}