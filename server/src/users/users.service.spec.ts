import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import User from './user.entity';
import { TodoModule } from 'src/todo/todo.module';
import Todo from 'src/todo/todo.entity';
import Joi from '@hapi/joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from 'src/database/database.module';
import { DataSource } from 'typeorm';
import { appdatasource } from 'src/database/appdatasource';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [UsersService,
      {
        provide: getRepositoryToken(User),
        useValue: {},
      }]
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
