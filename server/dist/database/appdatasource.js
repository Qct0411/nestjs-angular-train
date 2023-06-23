"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appdatasource = void 0;
const typeorm_1 = require("typeorm");
exports.appdatasource = new typeorm_1.DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'nestjs',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});
exports.appdatasource.initialize();
//# sourceMappingURL=appdatasource.js.map