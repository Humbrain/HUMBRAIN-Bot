import {NecordModule} from 'necord';
import {Module} from '@nestjs/common';
import {IntentsBitField} from 'discord.js';

const config = require('./config/config.json');

@Module({
    imports: [
        NecordModule.forRoot({
            token: config.DISCORD_TOKEN,
            intents: [IntentsBitField.Guilds]
        })
    ],
    providers: []
})
export class AppModule {
}