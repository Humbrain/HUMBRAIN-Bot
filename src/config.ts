import { config as c } from 'dotenv';

c();

let { DISCORD_TOKEN, DB_TYPE, DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;

if (!DISCORD_TOKEN) {
  throw new Error('Missing environment variables');
}

if (!DB_PORT)
  DB_PORT = "3306";

export const config = {
  DISCORD_TOKEN,
  DB_TYPE,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_PORT: parseInt(DB_PORT)
};