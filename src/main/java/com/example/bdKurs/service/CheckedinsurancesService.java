package com.example.bdKurs.service;

import com.example.bdKurs.model.Checkedinsurances;
import com.example.bdKurs.repository.CheckedinsurancesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CheckedinsurancesService {
    private final CheckedinsurancesRepository checkedinsurancesRepository;

    @Autowired
    public CheckedinsurancesService(CheckedinsurancesRepository checkedinsurancesRepository) {
        this.checkedinsurancesRepository = checkedinsurancesRepository;
    }

    public Checkedinsurances saveCheckedInsurance(Checkedinsurances checkedinsurances) {
        return checkedinsurancesRepository.save(checkedinsurances);
    }

    public List<Checkedinsurances> getAllCheckedInsurances() {
        return checkedinsurancesRepository.findAll();
    }
}
