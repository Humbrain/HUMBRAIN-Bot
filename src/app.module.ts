import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { NecordModule } from 'necord';
import { IntentsBitField } from 'discord.js';
import * as process from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    NecordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [IntentsBitField.Flags.Guilds],
      development: [process.env.DISCORD_DEV_GUILD_ID],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
