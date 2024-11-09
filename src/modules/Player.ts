import { Card } from "./Deck";

export class Player {
  public cards: Card[];
  public name: string;
  public takes: Card[];

  constructor(name: string) {
    this.name = name;
    this.cards = [];
    this.takes = [];
  }

  addCards(cards: Card[]) {
    this.cards = [...this.cards, ...cards];
  }

  playCard(card: Card) {
    const index = this.cards.indexOf(card);
    if (index === -1) {
      throw new Error(
        `Player ${this.name} does not have card ${card}`
      );
    }
    this.cards = this.cards.filter((c, i) => i !== index);
  }

  getScore() {
    const cardsToUse = this.flatTakes.filter(
      (card) => card !== 0
    );
    // Each card from -3 to 4 gives their value in points
    const cardsToSum = cardsToUse.filter((c) => c < 5);
    const sum = cardsToSum.reduce(
      (acc, card) => acc + card,
      0
    );

    // Each pack of 5 + 6 + 7 + 8 gives 5 points
    const values = new Map();

    for (const card of cardsToUse) {
      if (values.has(card)) {
        values.set(card, values.get(card) + 1);
      } else {
        values.set(card, 1);
      }
    }
    const nbFullPacks = Math.min(
      values.get(5) || 0,
      values.get(6) || 0,
      values.get(7) || 0,
      values.get(8) || 0
    );

    return sum + nbFullPacks * 5;
  }

  getPacks() {
    const values = new Map();

    for (const card of this.flatTakes) {
      if (values.has(card)) {
        values.set(card, values.get(card) + 1);
      } else {
        values.set(card, 1);
      }
    }

    return values;
  }

  get flatTakes() {
    return this.takes.flat();
  }
}
