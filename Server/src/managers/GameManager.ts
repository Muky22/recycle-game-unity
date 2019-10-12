import { Items, Item } from "../classes/Items";

export class GameManager {
    private hasItem = false;
    private item: Item = null;

    constructor(private socket) {
        this.register();
    }

    register() {
        this.socket.on("requestItem", () => {
            if(this.hasItem) {
                return;
            }

            this.item = Items.getRandomItem();
            this.hasItem = true;

            this.socket.emit("requestItemRes", {
                item: this.item
            });
        });

        
        this.socket.on("answerItem", (data: { answer: string }) => {
            if(!this.hasItem) {
                return;
            }

            if(this.item.correctAnswer === data.answer) {
                // correct
                
                this.socket.emit("answerItemRes", { correct: true });
            } else {
                // wrong
                
                this.socket.emit("answerItemRes", { correct: false });
            }

            this.item = null;
            this.hasItem = false;
        });
    }
}