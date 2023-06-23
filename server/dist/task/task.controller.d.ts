import Task from './task.entity';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAllTasks(): Promise<Task[]>;
    getOneTask(id: string): Promise<Task>;
    createTask(id: string, createTaskDto: CreateTaskDto): Promise<Task>;
    updateTask(id: string, updateDtotask: UpdateTaskDto): Promise<Task>;
    deleteTask(id: string): Promise<import("typeorm").DeleteResult>;
}
