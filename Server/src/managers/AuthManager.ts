export class AuthManager {
    constructor(private socket) {
        this.register();
    }

    register() {
        this.socket.on("autoAuth", (data: {id: string, nick: string}) => {
            this.socket.data.id = data.id;
            this.socket.data.nick = data.nick ? data.nick : "Anonymous";

            this.socket.emit("autoAuthRes", {
                nick: this.socket.data.nick
            });
        });
    }
}