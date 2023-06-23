import { DataSource } from "typeorm"

export const appdatasource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'nestjs',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
});

appdatasource.initialize();