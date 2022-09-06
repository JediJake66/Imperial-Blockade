package com.darksidedev.benchappserverside.Entity;



import javax.persistence.*;

@Entity
@Table(name = "tbl_gamePlayers")
public class Player {

    @Id
    @Column(name="Player_ID")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int playerId;

    @Column(name = "Name")
    private String name;

    @Column(name = "High_Score")
    private int highScore;

    public Player() {
    }

    public Player(String name, int highScore) {
        this.name = name;
        this.highScore = highScore;
    }

    public int getPlayerId() {
        return playerId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getHighScore() {
        return highScore;
    }
    public void setHighScore(int highScore) {
        this.highScore = highScore;
    }
}
