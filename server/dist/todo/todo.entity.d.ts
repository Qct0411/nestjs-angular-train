import Task from "src/task/task.entity";
import User from "src/users/user.entity";
declare class Todo {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    overDue: boolean;
    dueDate: Date;
    createdAt: Date;
    updatedAt: Date;
    tasks: Task[];
    user: User;
}
export default Todo;
