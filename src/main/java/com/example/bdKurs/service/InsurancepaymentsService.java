package com.example.bdKurs.service;

import com.example.bdKurs.model.Employees;
import com.example.bdKurs.model.Insurancepayments;
import com.example.bdKurs.repository.InsurancepaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InsurancepaymentsService {

    @Autowired
    private InsurancepaymentsRepository insurancepaymentsRepository;

    public Insurancepayments addInsurancepayment(Insurancepayments insurancepayment) {
        return insurancepaymentsRepository.save(insurancepayment);
    }

    public Optional<Insurancepayments> findById(Long id) {
        return insurancepaymentsRepository.findById(id);
    }

    public void deleteById(Long id) {
        insurancepaymentsRepository.deleteById(id);
    }

    public List<Insurancepayments> findAllById(List<Long> ids) {
        return insurancepaymentsRepository.findAllById(ids);
    }
}