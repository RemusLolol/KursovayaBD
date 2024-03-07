package com.example.bdKurs.controller;

import com.example.bdKurs.model.Checkedinsurances;
import com.example.bdKurs.service.CheckedinsurancesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.util.List;

@Controller
public class CheckStatusInsController {

    private final CheckedinsurancesService checkedinsurancesService;

    @Autowired
    public CheckStatusInsController(CheckedinsurancesService checkedinsurancesService){
        this.checkedinsurancesService = checkedinsurancesService;
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
}