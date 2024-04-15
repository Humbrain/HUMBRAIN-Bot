import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from './config';
import {Config} from "./entities/config";
import {Cooldowns} from "./entities/cooldowns";
import {Guild} from "./entities/guild";
import {Levels} from "./entities/Levels";
import {LevelsRanks} from "./entities/LevelsRanks";
import {LevelsUsers} from "./entities/LevelsUsers";
import {Logs} from "./entities/logs";
import {Partenaria} from "./entities/partenaria";
import {Presentations} from "./entities/Presentations";
import {PrivateRoom} from "./entities/privateRoom";
import {Tickets} from "./entities/Tickets";

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
  entities: [
      Config,
      Cooldowns,
      Guild,
      Levels,
      LevelsRanks,
      LevelsUsers,
      Logs,
      Partenaria,
      Presentations,
      PrivateRoom,
      Tickets
  ],
  subscribers: [],
  migrations: [],
});