"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const Joi = require("@hapi/joi");
const database_module_1 = require("./database/database.module");
const todo_module_1 = require("./todo/todo.module");
const task_module_1 = require("./task/task.module");
const users_module_1 = require("./users/users.module");
const auth_service_1 = require("./auth/auth.service");
const auth_module_1 = require("./auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const schedule_1 = require("@nestjs/schedule");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    POSTGRES_HOST: Joi.string().required(),
                    POSTGRES_PORT: Joi.number().required(),
                    POSTGRES_USER: Joi.string().required(),
                    POSTGRES_PASSWORD: Joi.string().required(),
                    POSTGRES_DB: Joi.string().required(),
                    JWT_SECRET: Joi.string().required(),
                    JWT_EXPIRATION_TIME: Joi.string().required(),
                    PORT: Joi.number(),
                }),
            }),
            database_module_1.DatabaseModule, todo_module_1.TodoModule, task_module_1.TaskModule, users_module_1.UsersModule, auth_module_1.AuthModule, jwt_1.JwtModule, schedule_1.ScheduleModule.forRoot()
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, auth_service_1.AuthService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map