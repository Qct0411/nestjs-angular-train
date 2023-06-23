import { Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getByEmail(email: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getById(id: number): Promise<User>;
}
