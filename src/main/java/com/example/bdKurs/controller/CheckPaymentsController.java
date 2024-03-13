package com.example.bdKurs.controller;

import com.example.bdKurs.model.Allinsurance;
import com.example.bdKurs.model.Checkedinsurances;
import com.example.bdKurs.model.InsuranceChangesRequest;
import com.example.bdKurs.model.Insurancepayments;
import com.example.bdKurs.service.AllInsuranceService;
import com.example.bdKurs.service.CheckedinsurancesService;
import com.example.bdKurs.service.InsurancepaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
public class CheckPaymentsController {

    private final InsurancepaymentsService insurancepaymentsService;
    private final CheckedinsurancesService checkedinsurancesService;
    private final AllInsuranceService allInsuranceService;

    @Autowired
    public CheckPaymentsController(AllInsuranceService allInsuranceService, InsurancepaymentsService insurancepaymentsService, CheckedinsurancesService checkedinsurancesService) {
        this.insurancepaymentsService = insurancepaymentsService;
        this.checkedinsurancesService = checkedinsurancesService;
        this.allInsuranceService = allInsuranceService;
    }

    @GetMapping("/checkPayments")
    public String checkPayments() {
        return "checkPaymentsIns";
    }

    @PostMapping("/getInsurances")
    public ResponseEntity<List<Allinsurance>> getAllCheckPayments() {
        List<Allinsurance> allinsurances = allInsuranceService.getAllInsurances();
        return new ResponseEntity<>(allinsurances, HttpStatus.OK);
    }

    @PostMapping("/getInsurancePaymentsById")
    public ResponseEntity<List<Insurancepayments>> getInsurancePaymentsById(@RequestBody List<Long> ids) {
        List<Insurancepayments> insurancePayments = insurancepaymentsService.findAllById(ids);
        return new ResponseEntity<>(insurancePayments, HttpStatus.OK);
    }


    @PostMapping("/updateChanges")
    public ResponseEntity<String> addChanges(@RequestBody InsuranceChangesRequest insuranceChangesRequest) {
        if (insuranceChangesRequest == null || insuranceChangesRequest.getInsurancepayment() == null || insuranceChangesRequest.getCheckedinsurances() == null) {
            return ResponseEntity.badRequest().body("Invalid request data");
        }

        Insurancepayments insurancepayment = insuranceChangesRequest.getInsurancepayment();
        insurancepaymentsService.addInsurancepayment(insurancepayment);

        Checkedinsurances checkedinsurances = insuranceChangesRequest.getCheckedinsurances();
        checkedinsurancesService.saveCheckedInsurance(checkedinsurances);

        return ResponseEntity.ok("Changes added successfully");
    }

    @PostMapping("/deleteInsurancesCase")
    public ResponseEntity<String> deleteInsuranceCase(@RequestBody long id) {
        Optional<Insurancepayments> insurancepayment = insurancepaymentsService.findById(id);
        if (!insurancepayment.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        checkedinsurancesService.deleteById(id);
        insurancepaymentsService.deleteById(id);

        return ResponseEntity.ok("Insurance case deleted successfully");
    }
}