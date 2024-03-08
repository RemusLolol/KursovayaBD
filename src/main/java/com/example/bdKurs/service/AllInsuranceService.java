package com.example.bdKurs.service;

import com.example.bdKurs.model.Allinsurance;
import com.example.bdKurs.repository.AllInsuranceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AllInsuranceService {

    private final AllInsuranceRepository allInsuranceRepository;

    @Autowired
    public AllInsuranceService(AllInsuranceRepository allInsuranceRepository) {
        this.allInsuranceRepository = allInsuranceRepository;
    }

    public List<Allinsurance> getAllInsurances() {
        return allInsuranceRepository.findAll();
    }

    public Allinsurance addInsurance(Allinsurance insurance) {
        return allInsuranceRepository.save(insurance);
    }

    public List<Allinsurance> getInsurancesByEmail(String clientEmail) {
        return allInsuranceRepository.findAllByClientemail(clientEmail);
    }

    public Optional<Allinsurance> findById(Long id) {
        return allInsuranceRepository.findById(id);
    }
}