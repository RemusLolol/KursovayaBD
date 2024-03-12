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
public class CheckPaymentsController {

    private final InsurancepaymentsService insurancepaymentsService;
    private final CheckedinsurancesService checkedinsurancesService;
    private final AllInsuranceService allInsuranceService;

    @Autowired
    public CheckPaymentsController(AllInsuranceService allInsuranceService, InsurancepaymentsService insurancepaymentsService, CheckedinsurancesService checkedinsurancesService){
        this.insurancepaymentsService = insurancepaymentsService;
        this.checkedinsurancesService = checkedinsurancesService;
        this.allInsuranceService = allInsuranceService;
    }
    @GetMapping("/checkPayments")
    public String checkPayments(){
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


}
