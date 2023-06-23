import Task from "src/task/task.entity";
import User from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
class Todo{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column({
        type:"boolean",
        default:false
    })
    completed: boolean;

    @Column({type:'boolean', default:false})
    overDue: boolean;

    @Column({type:'timestamptz' , nullable:true})
    dueDate: Date;

    // DATES
    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;
    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    // RELATIONS
    @OneToMany(()=>Task,task=>task.todo)
    tasks:Task[];
    @ManyToOne(()=>User,(user:User)=>user.todos)
    user:User;
}
export default Todo;