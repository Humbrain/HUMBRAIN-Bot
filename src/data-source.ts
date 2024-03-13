import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';

const dev = process.env.NODE_ENV !== 'production';
export const AppDataSource = new DataSource({
  type: config.DB_TYPE as any,
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASS,
  database: config.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['./src/entities/*.ts'],
  subscribers: [],
  migrations: [],
});