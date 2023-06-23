import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { get } from 'http';
import Todo from './todo.entity';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import { create } from 'domain';
import { CreateTodoDto } from './dto/createtodo.dto';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import RequestWithUser from 'src/auth/requestWithUser.interface';

@Controller('api/todo')
export class TodoController {
    constructor(private readonly todoService: TodoService){}

    @Get()
    async getAllTodos(): Promise<Todo[]>{
        const todos = await this.todoService.getAllTodos();
        return todos;
    }

    @Get('user')
    @UseGuards(JwtAuthGuard)
    async getAllTodosByUser(@Req() request: RequestWithUser): Promise<Todo[]>{
        const todos = await this.todoService.getAllTodosByUser(request.user);
        return todos;
    }

    @Get('overdue')
    @UseGuards(JwtAuthGuard)
    async getOverdueTodosByUser(@Req() request: RequestWithUser): Promise<Todo[]>{
        const todos = await this.todoService.getOverdueTodosByUser(request.user);
        return todos;
    }

    @Get(':id')
    async getOneTodo(@Param('id') id: string): Promise<Todo>{
        const todo = await this.todoService.getOneTodo(Number(id));
        return todo;
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createTodo(@Body() createTodoDto: CreateTodoDto, @Req() request: RequestWithUser){
        const newTodo = await this.todoService.createTodo(createTodoDto, request.user);
        return newTodo;
    }

    @Put(':id/completed')
    @UseGuards(JwtAuthGuard)
    async updateTodoComplete(@Param('id') id: string){
        const updatedTodo = await this.todoService.updateTodoComplete(Number(id));
        return {"message":"Todo state updated"};
    }

    @Put(':id/overdue')
    @UseGuards(JwtAuthGuard)
    async updateTodoOverdue(@Param('id') id: string){
        const updatedTodo = await this.todoService.updateTodoOverdue(Number(id));
        return {"message":"Todo state updated"};
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateTodo(@Param('id') id: string, @Body() todo:UpdateTodoDto){
        const updatedTodo = await this.todoService.updateTodo(Number(id), todo);
        return updatedTodo;
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteTodo (@Param('id') id: string){
        const deletedTodo = await this.todoService.deleteTodo(Number(id));
        return deletedTodo;
    }
}
