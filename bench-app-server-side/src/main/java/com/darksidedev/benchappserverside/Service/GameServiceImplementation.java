package com.darksidedev.benchappserverside.Service;

import com.darksidedev.benchappserverside.DAO.PlayerDAO;
import com.darksidedev.benchappserverside.Entity.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GameServiceImplementation implements GameService {

    @Autowired
    private PlayerDAO repo;

    @Override
    public List<Player> getAllPlayers() {
        return this.repo.findAll();
    }

    @Override
    public Player getById(int playerId) {
        Optional<Player> p = this.repo.findById(playerId);
        Player user = null;
        if (p.isPresent()){
            user=p.get();
        } else {
            throw new RuntimeException("Player Not Found For ID: " + playerId);
        }
        return user;
    }

    @Override
    public Player addPlayer(Player player) {
        return this.repo.save(player);
    }

    @Override
    public Player updateHighScore(Player player) {

        return this.repo.save(player);
    }

    @Override
    public String deleteProfile(int playerId) {
        this.repo.deleteById(playerId);
        return "Your profile has been cleared.";
    }
}
