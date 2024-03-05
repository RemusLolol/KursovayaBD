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

    public void registerClient(Clients client) {
        clientRepository.save(client);
    }

    public List<Clients> getAllClients() {
        return clientRepository.findAllClients();
    }

    public boolean clientExistsByEmail(String email) {
        return clientRepository.existsByEmail(email);
    }

    public boolean clientExistsByEmailAndPassword(String email, String password_hash) {
        return clientRepository.existsByEmailAndPasswordClients(email, password_hash);
    }
    public Clients getClientByEmail(String email) {
        return clientRepository.findByEmail(email);
    }
}

