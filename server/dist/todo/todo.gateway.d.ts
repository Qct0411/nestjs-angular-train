/// <reference types="node" />
import { OnGatewayConnection, OnGatewayDisconnect } from "@nestjs/websockets";
import { Socket } from "dgram";
import { TodoService } from "./todo.service";
export declare class TodoGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly todoService;
    server: any;
    users: number;
    userEmails: any[];
    constructor(todoService: TodoService);
    sendOverdueTodos(): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(): Promise<void>;
    checkUserConnection(): Promise<void>;
    userConnected(client: any, message: any): Promise<void>;
    userDisconnected(client: any, message: any): Promise<void>;
}
