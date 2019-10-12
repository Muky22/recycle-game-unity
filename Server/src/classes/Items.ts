export interface Item {
    id: string;
    correctAnswer: string;
}

export class Items {
    public static getRandomItem(): Item {
        return {
            id: "knife",
            correctAnswer: "paper"
        }
    }
}