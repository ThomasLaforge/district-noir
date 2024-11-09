import { Card, Deck } from "./Deck";
import { Line } from "./Line";
import { Player } from "./Player";

const NB_PLAYERS = 2;

export class Game {
  public players: Player[];
  public currentPlayerIndex: number;
  public deck: Deck;
  public line: Line;

  constructor(players: string[]) {
    this.players = players.map((name) => new Player(name));
    this.currentPlayerIndex = Math.floor(
      Math.random() * NB_PLAYERS
    );
    this.deck = new Deck();
    this.line = new Line(this.deck.drawCards(2));
  }

  playerPlay(card: Card) {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % NB_PLAYERS;
    this.line.addCard(card);
  }

  isGameOver() {
    // Check special cards (a player has 3 cards with a value of 0)
    let isGameOver = false;
    this.players.forEach((player) => {
      if (
        player.cards.filter((card) => card === 0).length ===
        3
      ) {
        isGameOver = true;
      }
    });

    if (
      !isGameOver &&
      this.deck.isEmpty() &&
      this.players.every(
        (player) => player.cards.length === 0
      )
    ) {
      isGameOver = true;
    }

    return isGameOver;
  }

  giveTurnCard() {
    this.players.forEach((player) => {
      player.addCards(this.deck.drawCards(5));
    });
  }

  nextTurn() {
    this.currentPlayerIndex =
      (this.currentPlayerIndex + 1) % NB_PLAYERS;
    if (!this.isGameOver()) {
      this.players.forEach((player) => {
        player.addCards(this.deck.drawCards(5));
      });
    }
  }

  getScores() {
    const packs = this.players.map((player) => {
      return player.getPacks();
    });

    const scores = this.players.map((player, index) => {
      let score = player.getScore();

      return {
        name: player.name,
        score
      };
    });
  }

  get currentPlayer() {
    return this.players[this.currentPlayerIndex];
  }
}
