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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const common_1 = require("@nestjs/common");
const todo_service_1 = require("./todo.service");
const updatetodo_dto_1 = require("./dto/updatetodo.dto");
const createtodo_dto_1 = require("./dto/createtodo.dto");
const jwtAuth_guard_1 = require("../auth/jwtAuth.guard");
let TodoController = exports.TodoController = class TodoController {
    constructor(todoService) {
        this.todoService = todoService;
    }
    async getAllTodos() {
        const todos = await this.todoService.getAllTodos();
        return todos;
    }
    async getAllTodosByUser(request) {
        const todos = await this.todoService.getAllTodosByUser(request.user);
        return todos;
    }
    async getOverdueTodosByUser(request) {
        const todos = await this.todoService.getOverdueTodosByUser(request.user);
        return todos;
    }
    async getOneTodo(id) {
        const todo = await this.todoService.getOneTodo(Number(id));
        return todo;
    }
    async createTodo(createTodoDto, request) {
        const newTodo = await this.todoService.createTodo(createTodoDto, request.user);
        return newTodo;
    }
    async updateTodoComplete(id) {
        const updatedTodo = await this.todoService.updateTodoComplete(Number(id));
        return { "message": "Todo state updated" };
    }
    async updateTodoOverdue(id) {
        const updatedTodo = await this.todoService.updateTodoOverdue(Number(id));
        return { "message": "Todo state updated" };
    }
    async updateTodo(id, todo) {
        const updatedTodo = await this.todoService.updateTodo(Number(id), todo);
        return updatedTodo;
    }
    async deleteTodo(id) {
        const deletedTodo = await this.todoService.deleteTodo(Number(id));
        return deletedTodo;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getAllTodos", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.default),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getAllTodosByUser", null);
__decorate([
    (0, common_1.Get)('overdue'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.default),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getOverdueTodosByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "getOneTodo", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwtAuth_guard_1.default),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createtodo_dto_1.CreateTodoDto, Object]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "createTodo", null);
__decorate([
    (0, common_1.Put)(':id/completed'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.default),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodoComplete", null);
__decorate([
    (0, common_1.Put)(':id/overdue'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.default),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodoOverdue", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.default),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updatetodo_dto_1.UpdateTodoDto]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "updateTodo", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwtAuth_guard_1.default),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TodoController.prototype, "deleteTodo", null);
exports.TodoController = TodoController = __decorate([
    (0, common_1.Controller)('api/todo'),
    __metadata("design:paramtypes", [todo_service_1.TodoService])
], TodoController);
//# sourceMappingURL=todo.controller.js.map