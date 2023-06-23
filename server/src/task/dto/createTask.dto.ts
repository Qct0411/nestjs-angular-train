import Todo from "src/todo/todo.entity";

export class CreateTaskDto{
    name:string;
    description:string;
    todo:Todo;
}