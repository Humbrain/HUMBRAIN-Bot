import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from "@nestjs/config";
import {NecordModule} from "necord";
import {IntentsBitField} from "discord.js";
import * as process from "process";

@Module({
    imports: [
        ConfigModule.forRoot(),
        NecordModule.forRoot({
            token: process.env.DISCORD_TOKEN,
            intents: [IntentsBitField.Flags.Guilds],
            development: [process.env.DISCORD_DEV_GUILD_ID],
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
