import Task from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
export declare class TaskService {
    private taskRepository;
    constructor(taskRepository: Repository<Task>);
    getAllTasks(): Promise<Task[]>;
    getOneTask(id: number): Promise<Task>;
    createTask(id: number, taskDto: CreateTaskDto): Promise<Task>;
    updateTask(id: number, taskDto: UpdateTaskDto): Promise<Task>;
    deleteTask(id: number): Promise<import("typeorm").DeleteResult>;
}
