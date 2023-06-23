import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, relations: ['todos'] });
        if (!user) throw new Error('User not found');
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.find();
        return users;
    }
    async createUser(createUserDto: CreateUserDto) {
        const { email, password } = createUserDto;
        const newUser = await this.userRepository.create({ email, password });
        await this.userRepository.save(newUser);
        return newUser;
    }

    async getById(id: number) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new Error('User not found');
        return user;
    }
}
