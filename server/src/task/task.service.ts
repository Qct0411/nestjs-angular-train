import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Task from './task.entity';
import { DataSource, Repository, getConnection, getRepository } from 'typeorm';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { get } from 'http';
import Todo from 'src/todo/todo.entity';
import { DatabaseModule } from 'src/database/database.module';
import { appdatasource } from 'src/database/appdatasource';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {}

    async getAllTasks() {
        const tasks = this.taskRepository.find();
        return tasks;
    }

    async getOneTask(id: number) {
        const task = await this.taskRepository.findOne({ where: { id: id },relations:["todo"]});
        if (!task) throw new Error('Task not found');
        return task;
    }

    async createTask(id:number,taskDto: CreateTaskDto) {
        const { name, description } = taskDto;
        const todo = await 
        appdatasource.getRepository(Todo).findOne({where: {id: id}});
        const newTask = await this.taskRepository.create({ name, description, todo});
        await this.taskRepository.save(newTask);
        return newTask;
    }

    async updateTask(id: number, taskDto: UpdateTaskDto) {
        const { name, description } = taskDto;
        await this.taskRepository.update({ id }, { name, description });
        const updatedTask = await this.taskRepository.findOne({ where: { id } });
        if (!updatedTask) throw new Error('Task not found');
        return updatedTask;
    }

    async deleteTask(id: number) {
        const deletedTask = await this.taskRepository.delete({ id });
        if (!deletedTask) throw new Error('Task not found');
        return deletedTask;
    }
}
