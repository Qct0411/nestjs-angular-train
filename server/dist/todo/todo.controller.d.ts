import { TodoService } from './todo.service';
import Todo from './todo.entity';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import { CreateTodoDto } from './dto/createtodo.dto';
import RequestWithUser from 'src/auth/requestWithUser.interface';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    getAllTodos(): Promise<Todo[]>;
    getAllTodosByUser(request: RequestWithUser): Promise<Todo[]>;
    getOverdueTodosByUser(request: RequestWithUser): Promise<Todo[]>;
    getOneTodo(id: string): Promise<Todo>;
    createTodo(createTodoDto: CreateTodoDto, request: RequestWithUser): Promise<Todo>;
    updateTodoComplete(id: string): Promise<{
        message: string;
    }>;
    updateTodoOverdue(id: string): Promise<{
        message: string;
    }>;
    updateTodo(id: string, todo: UpdateTodoDto): Promise<Todo>;
    deleteTodo(id: string): Promise<import("typeorm").DeleteResult>;
}
