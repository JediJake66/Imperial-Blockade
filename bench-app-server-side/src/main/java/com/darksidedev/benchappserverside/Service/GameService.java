package com.darksidedev.benchappserverside.Service;

import com.darksidedev.benchappserverside.Entity.Player;

import java.util.List;

public interface GameService {

    List<Player> getAllPlayers();
    Player getById (int playerId);
    Player addPlayer (Player player);
    Player updateHighScore (Player player);
    String deleteProfile(int playerId);
}
