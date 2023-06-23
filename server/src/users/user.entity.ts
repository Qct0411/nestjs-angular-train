import Todo from "src/todo/todo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string;

    @Column()
    password: string;
    
    @OneToMany(()=>Todo, (todo:Todo)=>todo.user)
    todos: Todo[];
}
export default User;