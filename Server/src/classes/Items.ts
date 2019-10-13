export interface Item {
  tag: string;
  correctAnswer: string;
}

export class Items {
  public static getRandomItem(): Item {
    return {
      tag: 'knife',
      correctAnswer: 'Blue',
    };
  }
}
