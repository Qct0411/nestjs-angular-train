import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Todo from './todo.entity';
import { CreateTodoDto } from './dto/createtodo.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import User from 'src/users/user.entity';
import { Cron } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
        private userService: UsersService
    ){}

    async getAllTodos(){
        const todos = this.todoRepository.find({relations:["tasks", "user"]});
        todos.then((todos)=>{
            todos.forEach((todo)=>{
                todo.user.password = undefined;
            })
        })
        return todos;
    }

    async getOneTodo(id:number){
        const todo = await this.todoRepository.findOne({where: {id: id}, relations:["tasks", "user"]});
        if (!todo) {
            throw new HttpException(
              `Todo list doesn't exist`,
              HttpStatus.BAD_REQUEST,
            );
          }
        return todo;
    }

    async getAllTodosByUser(user:User){
        const todos = await this.todoRepository.find({where: {user: user}, relations:["tasks", "user"]});
        todos.forEach((todo)=>{
            todo.user.password = undefined;
        })
        return todos;
    }
    async getOverdueTodosByUser(user:User){
        return await this.todoRepository.find({where: {user: user, overDue:true}});
    }

    async updateTodoOverdue(id:number){
        await this.todoRepository.update({id}, {overDue:true});
        const updatedTodo = await this.todoRepository.findOne({where: {id}});
        if (!updatedTodo) throw new Error('Todo not found');
        return updatedTodo;
    }
    


    async checkTodoOverdue(){
        let emails:string[] = [];
        const todos = await this.todoRepository.find({where: {overDue: false,completed:false}, relations:["user"]});
        const today = new Date().getTime();
        todos.forEach(async (todo)=>{
            if (todo.dueDate.getTime() < today){
                if (!emails.includes(todo.user.email)){
                    emails.push(todo.user.email);
                    Logger.log("Todo overdue: " + todo.name + " " + todo.user.email);
                }
                await this.todoRepository.update({id:todo.id}, {overDue:true});
            }
        });
        Logger.log('checking ' + emails.length);
        return emails;
    }

    async checkUserTodosOverdue(userEmail:string){
        let flag = false;
        const user = await this.userService.getByEmail(userEmail);
        const today = new Date().getTime();
        const todos = await this.todoRepository.find({where: {overDue: false,completed:false, user:user}});
        todos.forEach(async (todo)=>{
            if (todo.dueDate.getTime() < today){
                await this.todoRepository.update({id:todo.id}, {overDue:true});
                flag = true;
            }
        });

        return {"message":"Todos checked for overdue"};
    }



    async createTodo(todoDto: CreateTodoDto, user:User){
        const {name, description} = todoDto;
        const newtodo = await this.todoRepository.create({...todoDto, user:user});
        await this.todoRepository.save(newtodo);
        newtodo.user.password = undefined;
        return newtodo;
    }
    async updateTodo(id:number, todoDto: UpdateTodoDto){
        const {name, description, dueDate} = todoDto;
        await this.todoRepository.update({id}, {name, description, dueDate});
        const updatedTodo = await this.todoRepository.findOne({where: {id}});
        if (!updatedTodo) {
            throw new HttpException(
              `Todo list doesn't exist`,
              HttpStatus.BAD_REQUEST,
            );
          }
        return updatedTodo;
    }

    async updateTodoComplete(id:number){
        let {completed} = await this.todoRepository.findOne({where: {id}});
        completed ? completed = false : completed = true;
        await this.todoRepository.update({id}, {completed});
        const updatedTodo = await this.todoRepository.findOne({where: {id}});
        if (!updatedTodo) {
            throw new HttpException(
              `Todo list doesn't exist`,
              HttpStatus.BAD_REQUEST,
            );
          }
        return updatedTodo;
    }

    

    async deleteTodo (id:number){
        const deletedTodo = await this.todoRepository.delete({id});
        if (!deletedTodo) {
            throw new HttpException(
              `Todo list doesn't exist`,
              HttpStatus.BAD_REQUEST,
            );
          }
        return deletedTodo;
    }

        
    

}
