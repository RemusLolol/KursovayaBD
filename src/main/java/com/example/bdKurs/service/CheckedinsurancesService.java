package com.example.bdKurs.service;

import com.example.bdKurs.model.Checkedinsurances;
import com.example.bdKurs.repository.CheckedinsurancesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CheckedinsurancesService {
    private final CheckedinsurancesRepository checkedinsurancesRepository;

    @Autowired
    public CheckedinsurancesService(CheckedinsurancesRepository checkedinsurancesRepository) {
        this.checkedinsurancesRepository = checkedinsurancesRepository;
    }

    public Checkedinsurances saveCheckedInsurance(Checkedinsurances checkedinsurances) {
        Optional<Checkedinsurances> existingInsurance = checkedinsurancesRepository.findById(checkedinsurances.getId());
        if (existingInsurance.isPresent()) {
            existingInsurance.get().setStatusCheckedInsured(checkedinsurances.getStatusCheckedInsured());
            existingInsurance.get().setInsurance_claim_check(checkedinsurances.getInsurance_claim_check());
            existingInsurance.get().setPayment_verification_check(checkedinsurances.getPayment_verification_check());
            return checkedinsurancesRepository.save(existingInsurance.get());
        } else {
            return checkedinsurancesRepository.save(checkedinsurances);
        }
    }

    public List<Checkedinsurances> getAllCheckedInsurances() {
        return checkedinsurancesRepository.findAll();
    }

    public Optional<Checkedinsurances> findById(Long id) {
        return checkedinsurancesRepository.findById(id);
    }
}