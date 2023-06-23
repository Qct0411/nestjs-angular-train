import { Logger } from "@nestjs/common";
import { Cron, Interval } from "@nestjs/schedule";
import { OnGatewayConnection, WebSocketGateway, WebSocketServer, OnGatewayDisconnect, SubscribeMessage } from "@nestjs/websockets";
import { Socket } from "dgram";
import { TodoService } from "./todo.service";

@WebSocketGateway()
export class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect{
    @WebSocketServer() server;
    users = 0;
    userEmails = [];
    constructor(private readonly todoService: TodoService){}

    @Interval(10000)
    async sendOverdueTodos(){
        Logger.log("current user: " + this.userEmails);
        let emails:string[] = [];
        emails = await this.todoService.checkTodoOverdue();
        emails.forEach(async (email)=>{
            if (this.userEmails.includes(email)){
                Logger.log("sending to " + email);
                this.server.emit(email, "email");
            }
        }
        );
    }

    async handleConnection(client: Socket){
        this.server.emit('hello', 'hello from server');
        this.users++;
        Logger.log('connected');
    }
    async handleDisconnect(){
        Logger.log('disconnected');
        this.users--;
    // Notify connected clients of current users
        this.server.emit('users', this.users);
    }

    @Interval(20000)
    async checkUserConnection(){
        this.userEmails.length = 0;
        this.server.emit('check-user-connection', "checking user connection");
        
    }

    @SubscribeMessage('user-connected')
    async userConnected(client, message){
        Logger.log(message);
        if (!this.userEmails.includes(message)) {
            this.userEmails.push(message);
        }
        client.emit('notification', message);
    }
    @SubscribeMessage('user-disconnected')
    async userDisconnected(client, message){
        Logger.log(message);
        this.userEmails = this.userEmails.filter(userEmail => userEmail !== message);
        client.emit('notification', message);
    }

}