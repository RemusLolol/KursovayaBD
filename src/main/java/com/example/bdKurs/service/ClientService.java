package com.example.bdKurs.service;

import com.example.bdKurs.model.Clients;
import com.example.bdKurs.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    @Autowired
    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    // Метод для регистрации клиента
    public void registerClient(Clients client) {
        clientRepository.save(client);
    }

    // Метод для получения всех клиентов
    public List<Clients> getAllClients() {
        return clientRepository.findAllClients();
    }
}

