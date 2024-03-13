package com.example.bdKurs.controller;

import com.example.bdKurs.model.Allinsurance;
import com.example.bdKurs.model.Checkedinsurances;
import com.example.bdKurs.model.Typeinsurances;
import com.example.bdKurs.service.AllInsuranceService;
import com.example.bdKurs.service.CheckedinsurancesService;
import com.example.bdKurs.service.TypeInsurancesService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class NewInsuranceController {
    private final AllInsuranceService allInsuranceService;
    private final CheckedinsurancesService checkedinsurancesService;
    private final TypeInsurancesService typeInsurancesService;

     @Autowired
    public NewInsuranceController(AllInsuranceService allInsuranceService, CheckedinsurancesService checkedinsurancesService, TypeInsurancesService typeInsurancesService){
        this.allInsuranceService = allInsuranceService;
        this.checkedinsurancesService = checkedinsurancesService;
        this.typeInsurancesService = typeInsurancesService;
     }

    @GetMapping("/newInsurance")
    public String newInsurance() {
        return "createNewInsurance";
    }

    @PostMapping("/getTypeInsurances")
    public ResponseEntity<List<Typeinsurances>> getAllTypeInsurances(@RequestBody String request) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode jsonNode = objectMapper.readTree(request);
            String typeface = jsonNode.get("typeface").asText();
            List<Typeinsurances> typeInsurancesList = typeInsurancesService.getAllTypeInsurancesByTypeface(typeface);
            return ResponseEntity.ok().body(typeInsurancesList);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/addNewInsurances")
    public ResponseEntity<String> addNewInsurances(@RequestBody Allinsurance allInsurance) {
        allInsuranceService.addInsurance(allInsurance);

        Checkedinsurances checkedInsurance = new Checkedinsurances();
        checkedInsurance.setId_document_insurances(allInsurance.getId());
        checkedInsurance.setStatusCheckedInsured("Не проверено");
        checkedInsurance.setInsurance_claim_check("Не подтверждено");
        checkedInsurance.setPayment_verification_check("Не выплачено");

        checkedinsurancesService.saveCheckedInsurance(checkedInsurance);

        return ResponseEntity.status(HttpStatus.OK).body("Страховка успешно зарегистрирована.");
    }
}