import { Repository } from 'typeorm';
import Todo from './todo.entity';
import { CreateTodoDto } from './dto/createtodo.dto';
import { UpdateTodoDto } from './dto/updatetodo.dto';
import User from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
export declare class TodoService {
    private todoRepository;
    private userService;
    constructor(todoRepository: Repository<Todo>, userService: UsersService);
    getAllTodos(): Promise<Todo[]>;
    getOneTodo(id: number): Promise<Todo>;
    getAllTodosByUser(user: User): Promise<Todo[]>;
    getOverdueTodosByUser(user: User): Promise<Todo[]>;
    updateTodoOverdue(id: number): Promise<Todo>;
    checkTodoOverdue(): Promise<string[]>;
    checkUserTodosOverdue(userEmail: string): Promise<{
        message: string;
    }>;
    createTodo(todoDto: CreateTodoDto, user: User): Promise<Todo>;
    updateTodo(id: number, todoDto: UpdateTodoDto): Promise<Todo>;
    updateTodoComplete(id: number): Promise<Todo>;
    deleteTodo(id: number): Promise<import("typeorm").DeleteResult>;
}
