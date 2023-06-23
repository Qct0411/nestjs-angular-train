import Todo from "src/todo/todo.entity";
declare class User {
    id: number;
    email: string;
    password: string;
    todos: Todo[];
}
export default User;
