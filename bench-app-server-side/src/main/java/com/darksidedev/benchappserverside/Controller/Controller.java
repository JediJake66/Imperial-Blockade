package com.darksidedev.benchappserverside.Controller;

import com.darksidedev.benchappserverside.DAO.PlayerDAO;
import com.darksidedev.benchappserverside.Entity.Player;
import com.darksidedev.benchappserverside.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controller {

    @Autowired
    private GameService service;

    @GetMapping("/")
    public String home() {
        return "<HTML><H1>Imperial Blockade Server Side</H1></HTML>";
    }

    @GetMapping("/high-scores")
    public List<Player> getScores() {
        return this.service.getAllPlayers();
    }

    @GetMapping("/high-scores/{playerId}")
    public Player getPlayer(@PathVariable String playerId) {
        return this.service.getById(Integer.parseInt(playerId));
    }

    @PostMapping("/high-scores")
    public Player addPlayer (@RequestBody Player player) {
        return this.service.addPlayer(player);
    }

    @PutMapping("/high-scores")
    public Player updatePlayer (@RequestBody Player player) {
        return this.service.updateHighScore(player);
    }

    @DeleteMapping("/high-scores/{playerId}")
    public String deletePlayer(@PathVariable String playerId) {
       return this.service.deleteProfile(Integer.parseInt(playerId));
    }
}
