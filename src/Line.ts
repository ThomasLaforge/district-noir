export class Line {
  public cards: number[];

  constructor(cards: number[]) {
    this.cards = cards;
  }

  addCard(card) {
    this.cards.push(card);
  }

  getLastFiveCards() {
    return this.cards.slice(-5);
  }
}
