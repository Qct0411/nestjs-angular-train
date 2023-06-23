import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import Task from './task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TaskService } from './task.service';

@Controller('api/task')
export class TaskController {
    constructor (private readonly taskService: TaskService){}

    @Get()
    async getAllTasks(): Promise<Task[]>{
        const tasks = await this.taskService.getAllTasks();
        return tasks;
    }
    @Get(':id')
    async getOneTask(@Param('id') id: string): Promise<Task>{
        const task = await this.taskService.getOneTask(Number(id));
        return task;
    }
    @Post(':id')
    async createTask(@Param('id') id:string,@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        const newTask = await this.taskService.createTask(Number(id),createTaskDto);
        return newTask;
    }

    @Put(':id')
    async updateTask(@Param('id') id: string, @Body() updateDtotask: UpdateTaskDto): Promise<Task>{
        const updatedTask = await this.taskService.updateTask(Number(id), updateDtotask);
        return updatedTask;
    }

    @Delete(':id')
    async deleteTask(@Param('id') id: string){
        const deletedTask = await this.taskService.deleteTask(Number(id));
        return deletedTask;
    }
}
