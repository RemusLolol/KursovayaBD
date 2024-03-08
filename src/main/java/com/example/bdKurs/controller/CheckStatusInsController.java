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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
public class CheckStatusInsController {

    private final CheckedinsurancesService checkedinsurancesService;
    private final AllInsuranceService allInsuranceService;

    @Autowired
    public CheckStatusInsController(CheckedinsurancesService checkedinsurancesService, AllInsuranceService allInsuranceService){
        this.checkedinsurancesService = checkedinsurancesService;
        this.allInsuranceService = allInsuranceService;
    }

    @GetMapping("/checkStatus")
    public String checkStatus(){
        return "checkStatusInsurances";
    }

    @PostMapping("/allCheckedInsurances")
    public ResponseEntity<List<Checkedinsurances>> allInsurances(){
        List<Checkedinsurances> checkedinsurances = checkedinsurancesService.getAllCheckedInsurances();
        return new ResponseEntity<>(checkedinsurances, HttpStatus.OK);
    }

    @PostMapping("/saveCheckedInsurance")
    public ResponseEntity<Checkedinsurances> saveCheckedInsurance(@RequestBody Checkedinsurances checkedinsurances){
        Checkedinsurances savedCheckedInsurance = checkedinsurancesService.saveCheckedInsurance(checkedinsurances);
        return new ResponseEntity<>(savedCheckedInsurance, HttpStatus.OK);
    }

    @PostMapping("/getDocumentByID")
    public ResponseEntity<Allinsurance> getDocumentByID(@RequestBody Map<String, String> requestBody) {
        Long id = Long.valueOf(requestBody.get("id"));
        Optional<Allinsurance> allinsurance = allInsuranceService.findById(id);
        if (allinsurance.isPresent()) {
            return new ResponseEntity<>(allinsurance.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/saveChanges")
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