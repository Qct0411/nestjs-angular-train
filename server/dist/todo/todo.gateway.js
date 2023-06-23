"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoGateway = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const websockets_1 = require("@nestjs/websockets");
const todo_service_1 = require("./todo.service");
let TodoGateway = exports.TodoGateway = class TodoGateway {
    constructor(todoService) {
        this.todoService = todoService;
        this.users = 0;
        this.userEmails = [];
    }
    async sendOverdueTodos() {
        common_1.Logger.log("current user: " + this.userEmails);
        let emails = [];
        emails = await this.todoService.checkTodoOverdue();
        emails.forEach(async (email) => {
            if (this.userEmails.includes(email)) {
                common_1.Logger.log("sending to " + email);
                this.server.emit(email, "email");
            }
        });
    }
    async handleConnection(client) {
        this.server.emit('hello', 'hello from server');
        this.users++;
        common_1.Logger.log('connected');
    }
    async handleDisconnect() {
        common_1.Logger.log('disconnected');
        this.users--;
        this.server.emit('users', this.users);
    }
    async checkUserConnection() {
        this.userEmails.length = 0;
        this.server.emit('check-user-connection', "checking user connection");
    }
    async userConnected(client, message) {
        common_1.Logger.log(message);
        if (!this.userEmails.includes(message)) {
            this.userEmails.push(message);
        }
        client.emit('notification', message);
    }
    async userDisconnected(client, message) {
        common_1.Logger.log(message);
        this.userEmails = this.userEmails.filter(userEmail => userEmail !== message);
        client.emit('notification', message);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], TodoGateway.prototype, "server", void 0);
__decorate([
    (0, schedule_1.Interval)(10000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoGateway.prototype, "sendOverdueTodos", null);
__decorate([
    (0, schedule_1.Interval)(20000),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoGateway.prototype, "checkUserConnection", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('user-connected'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodoGateway.prototype, "userConnected", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('user-disconnected'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodoGateway.prototype, "userDisconnected", null);
exports.TodoGateway = TodoGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoGateway);
//# sourceMappingURL=todo.gateway.js.map