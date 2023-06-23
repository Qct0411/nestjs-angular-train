import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { TodoController } from './todo.controller';
import Todo from './todo.entity';
import { TodoGateway } from './todo.gateway';
import { get } from 'http';
import { UsersService } from 'src/users/users.service';
import User from 'src/users/user.entity';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [TodoService,UsersService, {
        provide: getRepositoryToken(Todo),
        useValue: {},
      },{
        provide: getRepositoryToken(User),
        useValue: {},
      },
    ]
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const result = [];
      jest.spyOn(service, 'getAllTodos').mockResolvedValueOnce(result);
      expect(await service.getAllTodos()).toBe(result);
    });
  });
});
