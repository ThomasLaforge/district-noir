import { Tools } from "./Tools";

export type Card =
  | -3
  | -2
  | -1
  | 0
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8;

const initialCardsObj = new Map<number, number>();
initialCardsObj.set(-3, 2);
initialCardsObj.set(-2, 4);
initialCardsObj.set(-1, 3);
initialCardsObj.set(0, 3);
initialCardsObj.set(2, 4);
initialCardsObj.set(3, 2);
initialCardsObj.set(4, 1);
initialCardsObj.set(5, 5);
initialCardsObj.set(6, 6);
initialCardsObj.set(7, 7);
initialCardsObj.set(8, 8);

export class Deck {
  public cards: Card[];

  constructor(
    initialCards: Map<number, number> = initialCardsObj
  ) {
    this.cards = [];
    for (const [card, count] of initialCards) {
      for (let i = 0; i < count; i++) {
        this.cards.push(card as Card);
      }
    }
    this.shuffle();
    // remove 3 cards
    this.cards = this.cards.slice(0, this.cards.length - 3);
  }

  addCard(card) {
    this.cards.push(card);
  }
  shuffle() {
    this.cards = Tools.shuffle(this.cards);
  }
  drawCard() {
    return this.cards.pop() as Card;
  }
  drawCards(nbCards: number) {
    return Array.from({ length: nbCards }, () =>
      this.drawCard()
    );
  }

  isEmpty() {
    return this.cards.length === 0;
  }
}
