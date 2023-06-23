import Todo from "src/todo/todo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Task{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @ManyToOne(()=>Todo,(todo:Todo)=>todo.tasks)
    todo:Todo;

}
export default Task;