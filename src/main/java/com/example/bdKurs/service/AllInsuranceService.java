package com.example.bdKurs.service;

import com.example.bdKurs.model.AllInsurance;
import com.example.bdKurs.repository.AllInsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AllInsuranceService {

    private final AllInsuranceRepository allInsuranceRepository;

    @Autowired
    public AllInsuranceService(AllInsuranceRepository allInsuranceRepository) {
        this.allInsuranceRepository = allInsuranceRepository;
    }

    public List<AllInsurance> getAllInsurances() {
        return allInsuranceRepository.findAll();
    }

    public AllInsurance addInsurance(AllInsurance insurance) {
        return allInsuranceRepository.save(insurance);
    }
}
