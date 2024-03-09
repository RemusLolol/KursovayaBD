package com.example.bdKurs.service;

import com.example.bdKurs.model.Typeinsurances;
import com.example.bdKurs.repository.TypeInsurancesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TypeInsurancesService {
    private final TypeInsurancesRepository typeInsurancesRepository;

    @Autowired
    public  TypeInsurancesService(TypeInsurancesRepository typeInsurancesRepository) {
        this.typeInsurancesRepository = typeInsurancesRepository;
    }

    public List<Typeinsurances> getALlTypeInsurances(){
        return typeInsurancesRepository.findAllTypeInsurances();
    }

    public List<Typeinsurances> getAllTypeInsurancesByTypeface(String typeface) {
        return typeInsurancesRepository.findByTypeface(typeface);
    }

}