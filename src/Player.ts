export class Player {
  public cards: number[];
  public name: string;

  constructor(name: string) {
    this.name = name;
    this.cards = [];
  }

  addCards(cards: number[]) {
    this.cards = [...this.cards, ...cards];
  }

  playCard(card: number) {
    const index = this.cards.indexOf(card);
    if (index === -1) {
      throw new Error(
        `Player ${this.name} does not have card ${card}`
      );
    }
    this.cards = this.cards.filter((c, i) => i !== index);
  }

  getScore() {
    const cardsToUse = this.cards.filter(
      (card) => card !== 0
    );
  }
}
